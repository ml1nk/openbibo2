import user from './../datatable/user.mjs';
import media from './../datatable/media.mjs';

import './datatable.css';
import './../datatable/user.css';
import i18next from './lang.mjs';


import $ from 'jquery';

const tables = {
    user: user,
    media: media,
};

let enabled = false;


export default (io, name, id) => {
    if (enabled) {
        enabled.table.api().clear().destroy();
    }

    let stopped = false;
    let config = tables[name](io);
    let table = $('#'+id).dataTable({
        serverSide: true,
        ajax: (data, callback) =>{
            if (stopped) {
                stopped = false;
                return;
            }

            let clean = {
                draw: data.draw,
                start: data.start,
                length: data.length,
                search: data.search,
                order: data.order,
            };

            io.emit('datatable', {
                name: config.name,
                type: 'read',
                data: clean,
            }, (result)=> {
                callback(result);
            });
        },
        columns: [{}].concat(config.columns),
        columnDefs: [{
            className: 'control',
            orderable: false,
            targets: 0,
            render: ()=>'',
        },
        {
            className: 'all',
            targets: [1],
        }].concat(config.columnDefs),
        buttons: config.buttons,
        order: config.order,
        language: i18next.t('datatable', {returnObjects: true}),
        scroller: {
            displayBuffer: 2,
            boundaryScale: 0.70,
            serverThrottle: 200,
        },
        dom: '<"wrapper"fBi>lrtp',
        scrollY: 'auto',
        scrollCollapse: true,
        deferRender: true,
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal( {
                    header: ( row ) => {
                        return i18next.t('responsive.details');
                    },
                } ),
                renderer: ( api, rowIdx, columns ) => {
                    let data = api.row(rowIdx).data();
                    let head = api.settings().init().columns;
                    let out = '<';
                    for (let i=1; i<data.length; i++) {
                        if (head[i].visible===false) {
                            continue;
                        }
                        out+= '<tr>'+
                                '<td>'+head[i].title+':'+'</td> '+
                                '<td>'+$('<span/>').text(data[i]).html() +'</td> '+
                            '</tr>';
                    }
                    return $('<table class="table" />').append( out );
                },
                type: 'column',
                target: 0,
            },
        },
        select: {
            style: 'multi',
            selector: 'td:not(.control)',
         },
    });
    enabled = {
        table: table,
        id: id,
    };

    let search = '';
    table.on('search.dt', () => {
        let lastSearch = search;
        search = table.api().search();
        if (lastSearch==='' && table.api().search()!=='') {
            stopped=true;
            table.api().order([]);
            table.api().draw();
        } else if (lastSearch!=='' && table.api().search()==='' && table.api().order().length===0) {
            stopped=true;
            table.api().order(config.order);
            table.api().draw();
        }
    });
};