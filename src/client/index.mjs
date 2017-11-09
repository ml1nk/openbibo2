import io from 'socket.io-client';
import lang from './lib/lang.mjs';
import throttle from './lib/throttle.mjs';
import $ from 'jquery';
import 'bootstrap';
import 'datatables.net';

$.fn.dataTable.util.throttle = throttle;

import 'datatables.net-bs4';
import '@mlink/datatables.net-scroller';
import 'datatables.net-select';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs4';

import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';

import 'font-awesome/css/font-awesome.css';

import datatable from './lib/datatable.mjs';

let socket = io(location.protocol + '//' + location.hostname + ':'+WEBSOCKET, {
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false,
});

lang();

$('.navbar-nav a').click((e)=>{
    let target = $(e.target);
    if (target.hasClass('active')) {
        return;
    }
    let oldView = $('.navbar-nav a.active').removeClass('active').data('view');
    let newView = target.addClass('active').data('view');
    $('#'+oldView).hide();
    $('#'+newView).show();
    datatable(socket, newView, newView+'_table');
});

let view = $('.navbar-nav a.active').data('view');
datatable(socket, view, view+'_table');

window.socket = socket;

