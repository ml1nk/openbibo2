import io from 'socket.io-client';
import $ from 'jquery';
import 'bootstrap';
import 'datatables.net';

window.$ = $;


import 'datatables.net-bs4';
import '@mlink/datatables.net-scroller';
import 'datatables.net-buttons';
import 'datatables.net-buttons-bs4';
import 'datatables.net-select';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs4';
import 'jquery-confirm/js/jquery-confirm.js';


import 'bootstrap/dist/css/bootstrap.css';
import 'jquery-confirm/css/jquery-confirm.css';

import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';

import 'font-awesome/css/font-awesome.css';

import datatable from './lib/datatable.mjs';

let socket = io(location.protocol + '//' + location.hostname + ':'+WEBSOCKET, {
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false,
});

$('.navbar-nav a').click((e)=>{
    let target = $(e.target);
    if (target.hasClass('active')) {
        return;
    }
    let oldView = $('.navbar-nav a.active').removeClass('active').data('view');
    let newView = target.addClass('active').data('view');
    $('#'+oldView).hide();
    //$('#'+oldView+'_table').dataTable.api().destroy();
    $('#'+newView).show();
    datatable(socket, newView, newView+'_table');
});

let view = $('.navbar-nav a.active').data('view');
datatable(socket, view, view+'_table');

window.socket = socket;

