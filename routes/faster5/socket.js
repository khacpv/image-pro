var socket = {};

socket.draw = function (req) {
    req.io.broadcast('faster5:draw', req.data);
};

module.exports = socket;