import userOverview from './../datatable/userOverview.mjs';
import mediaOverview from './../datatable/mediaOverview.mjs';

import './datatable.css';
import './../datatable/userOverview.css';
import i18next from 'i18next';


import $ from 'jquery';

const tables = {
    userOverview: userOverview,
    mediaOverview: mediaOverview,
};

let enabled = false;


export default (io, name, id) => {
    if (enabled) {
        enabled.table.api().destroy();
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
        columns: config.columns,
        columnDefs: config.columnDefs,
        order: config.order,
        language: i18next.t('datatable', {returnObjects: true}),
        scroller: {
            displayBuffer: 2,
            boundaryScale: 0.70,
            serverThrottle: 200,
        },
        dom: '<"wrapper"fi>lrtp',
        scrollY: 'auto',
        scrollCollapse: true,
        deferRender: true,
        responsive: true,
        select: true,
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