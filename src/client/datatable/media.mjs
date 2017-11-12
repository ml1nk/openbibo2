import i from './../lib/lang.mjs';
import $ from 'jquery';

export default (io) => {
    return {
        columns: [
            {
                title: i.t('media.title'),
            },
            {
                title: i.t('media.part'),
            },
            {
                title: i.t('media.author'),
            },
            {
                title: i.t('media.type'),
            },
            {
                title: i.t('media.category'),
            },
            {
                visible: false,
            },
            {
                visible: false,
            },
        ],
        buttons: [
            {
                text: i.t('media.button.delete.title'),
                extend: 'selected',
                action: ( e, dt, node, config ) => {

                    let arr = [];
                    $.each(dt.rows('.selected').data(), function() {
                        arr.push(this[0]);
                    });

                    let rows = dt.rows('.selected');
                    $.confirm({
                        title: i.t('media.button.delete.title'),
                        content: i .t('media.button.delete.warning', {count: rows.count()}),
                        buttons: {
                            confirm: {
                                text: i.t('media.button.delete.yes'),
                                action: () => {
                                    io.emit('datatable', {
                                        data: arr,
                                        type: 'del',
                                        name: 'media',
                                    }, (res)=>{
                                        dt.draw();
                                    });
                                },
                            },
                            cancel: {
                                text: i.t('media.button.delete.no'),
                            },
                        },
                    });
                },
            },
        ],
        columnDefs: [],
        order: [[1, 'asc']],
        name: 'media',
    };
};
