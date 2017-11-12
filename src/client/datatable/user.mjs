export default (io) => {
    return {
        'columns': [
            {
                'title': 'Name',
            },
            {
                'title': 'E-Mail',
            },
            {
                'title': 'Barcode',
            },
            {
                'title': 'Aktiv',
                'width': '40px',
            },
        ],
        'columnDefs': [
            {
                'render': function( data, type, row ) {
                    return data ? '<span class="user"><i class="fa fa-book" aria-hidden="true"></i></span>' : '';
                },
                'targets': 4,
            },
        ],
        'buttons': [],
        'order': [[1, 'asc']],
        'name': 'user',
    };
};


