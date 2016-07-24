var app = {};
const App = {};

App.url = '/faster5';

App.socket = io.connect();

App.user = {
    name: '',
    pass: '',
    token: ''
};

App.login = function () {
    var name = $('#name').val();
    var pass = $('#pass').val();
    $.post(App.url + '/api/login', {name: name, pass: pass}, function (data) {
        console.log('token:' + data.token);
        localStorage.token = data.token;
        $('#login').hide();
    })
};

App.logout = function () {
    $.ajax({
        url: App.url + '/api/logout',
        dataType: 'jsonp',
        beforeSend: function (xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        }
    })
};

App.draw = function (data) {
    if (data.type == "dragstart") {
        App.ctx.beginPath();
        App.ctx.moveTo(data.x, data.y);
    } else if (data.type == "drag") {
        App.ctx.lineTo(data.x, data.y);
        App.ctx.stroke();
    } else {
        App.ctx.stroke();
        App.ctx.closePath();
    }
};

$(function () {
    $('#test').text(localStorage.token);
    App.ctx = $('canvas')[0].getContext('2d');
    $('body').on('drag dragstart dragend', 'canvas', function (e) {
        var offset = $(this).offset();
        data = {
            x: (e.clientX - offset.left),
            y: (e.clientY - offset.top),
            type: e.handleObj.type
        };
        App.draw(data);
        App.socket.emit('faster5:draw', data);
    });
});

// register socket
App.socket.on('faster5:draw', App.draw);