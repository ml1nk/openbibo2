export default {
        'columns': [
            {
                'title': 'Barcode',
            },
            {
                'title': 'Name',
            },
            {
                'title': 'E-Mail',
            },
            {
                'title': 'Aktiv',
                'width': '40px',
            },
            {
                'visible': false,
            },
        ],
        'columnDefs': [
            {
                'render': function( data, type, row ) {
                    return data ? '<span class="userOverview"><i class="fa fa-book" aria-hidden="true"></i></span>' : '';
                },
                'targets': 4,
            },
        ],
        'order': [[1, 'asc']],
        'name': 'userOverview',
};
