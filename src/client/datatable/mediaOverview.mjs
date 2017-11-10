import i from './../lib/lang.mjs';
import $ from 'jquery';

export default {
        columns: [
            {
                title: i.t('mediaOverview.title'),
            },
            {
                title: i.t('mediaOverview.part'),
            },
            {
                title: i.t('mediaOverview.author'),
            },
            {
                title: i.t('mediaOverview.type'),
            },
            {
                title: i.t('mediaOverview.category'),
            },
            {
                visible: false,
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
                text: i.t('mediaOverview.button.delete.title'),
                extend: 'selected',
                action: ( e, dt, node, config ) => {
                    let rows = dt.rows('.selected');
                    $.confirm({
                        title: i.t('mediaOverview.button.delete.title'),
                        content:i .t('mediaOverview.button.delete.warning',{ count : rows.count() }),
                        buttons: {
                            confirm: {
                                text: i.t('mediaOverview.button.delete.yes'),
                                action: () => {
                                    $.alert('Confirmed!');
                                },
                            },
                            cancel: {
                                text: i.t('mediaOverview.button.delete.no'),
                                action: () => {
                                    $.alert('Canceled!');
                                },
                            },
                        },
                    });

                    let arr = [];
                    $.each(dt.rows('.selected').data(), function() {
                      //  console.log(this);
                        arr.push(this[5]);
                    });
                    console.log(arr);
                },
            },
        ],
        order: [[0, 'asc']],
        name: 'mediaOverview',
};
