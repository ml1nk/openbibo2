import i from './../lib/lang.mjs';
import $ from 'jquery';

export default {
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
                    let rows = dt.rows('.selected');
                    $.confirm({
                        title: i.t('media.button.delete.title'),
                        content: i .t('media.button.delete.warning', {count: rows.count()}),
                        buttons: {
                            confirm: {
                                text: i.t('media.button.delete.yes'),
                                action: () => {
                                    $.alert('Confirmed!');
                                },
                            },
                            cancel: {
                                text: i.t('media.button.delete.no'),
                                action: () => {
                                    $.alert('Canceled!');
                                },
                            },
                        },
                    });

                    /*
                    let arr = [];
                    $.each(dt.rows('.selected').data(), function() {
                      //  console.log(this);
                        arr.push(this[5]);
                    });
                    console.log(arr);
                    */
                },
            },
        ],
        columnDefs: [],
        order: [[1, 'asc']],
        name: 'media',
};
