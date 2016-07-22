var app = {};
App = {};
App.socket = io.connect();

const ACTION_DRAW = 'faster5:draw';

App.socket.on(ACTION_DRAW, App.draw);

App.socket.send = function(data){
    App.socket.emit(ACTION_DRAW, data);
};

App.draw = function(data) {
    if (data.type == "dragstart") {
        App.ctx.beginPath();
        App.ctx.moveTo(data.x,data.y);
    } else if (data.type == "drag") {
        App.ctx.lineTo(data.x,data.y);
        App.ctx.stroke();
    } else {
        App.ctx.stroke();
        App.ctx.closePath();
    }
};

$(function() {
    App.ctx = $('canvas')[0].getContext('2d');
    $('body').on('drag dragstart dragend','canvas', function(e) {
        var offset = $(this).offset();
        data = {
            x: (e.clientX - offset.left),
            y: (e.clientY - offset.top),
            type: e.handleObj.type
        };
        App.draw(data); // Draw yourself.
        App.socket.send(data);
    })
});