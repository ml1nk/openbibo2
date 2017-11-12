import userOverview from './../datatable/userOverview.mjs';
import mediaOverview from './../datatable/mediaOverview.mjs';

import './datatable.css';
import './../datatable/userOverview.css';
import i18next from './lang.mjs';


import $ from 'jquery';

const tables = {
    userOverview: userOverview,
    mediaOverview: mediaOverview,
};

let enabled = false;


export default (io, name, id) => {
    if (enabled) {
        enabled.table.api().clear().destroy();
    }

    let stopped = false;
    let config = tables[name];
    let table = $('#'+id).dataTable({
        serverSide: true,
        ajax: (data, callback) =>{
            if (stopped) {
                stopped = false;
                return;
            }
            io.emit('datatable', {
                name: config.name,
                data: data,
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
}
;