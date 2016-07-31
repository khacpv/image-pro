/**
 * App.io.broadcast     - send to all
 * req.io.broadcast     - send to others
 * req.io.emit          - send to me
 * req.io.response(d)   - send http
 * req.io.join(r)    - join room
 * req.io.leave(r)   - leave room
 * req.io.room(r).broadcast(event, data)    - send to other members
 * app.io.room(r).broadcast(e,d)            - send to all members
 *
 * */
var User = require(__appname + '/model/user');
var Question = require(__appname + '/model/question');
var Room = require(__appname + '/model/room');

var faster5 = {
    users: [],
    rooms: [],
    dummyUsers: [
        new User(0, 'lam tam nhu', 'china', 'fb_id_0', 'http://www.nhipsongphunu.com/public/default/content/Images/Lam%20dep/avatar%20-20150311-14030457.jpg'),
        new User(1, 'trieu vy', 'hongkong', 'fb_id_1', 'http://avatar.nct.nixcdn.com/playlist/2013/11/07/2/e/6/4/1383813832087_500.jpg'),
        new User(2, 'michele', 'america', 'fb_id_2', 'http://media.todaybirthdays.com/thumb_x256x256/upload/2015/11/30/michelle-rodriguez.jpg'),
        new User(3, 'arvigne', 'brazin', 'fb_id_3', 'http://images2.fanpop.com/image/photos/9800000/beautiful-face-avril-lavigne-9812919-453-500.jpg')
    ]
};

faster5.log = function () {
    console.log('total users: ' + faster5.users.map(function (user) {
            return user.name;
        }).join(','));
    //console.log('total rooms: ' + faster5.rooms.map(function (room) {
    //        return room.name;
    //    }).join(','));
};

/**
 * user click login (with FB or username/address)
 * @param req (name,address,fbId)
 * */
faster5.login = function (req) {
    var reqUser = req.data.user;
    console.log('reqUsername: ' + reqUser.name);
    if (!reqUser || reqUser.name.length == 0) {
        req.io.emit('faster5:login', {success: false});
        return;
    }
    var isExist = false;
    var resUser = {};

    for (var i = 0; i < faster5.users.length; i++) {
        if (faster5.users[i].name === reqUser.name) {
            isExist = true;
            resUser = faster5.users[i];
            break;
        }
    }
    if (!isExist) {
        resUser = new User((Math.random() * 10000000) | 0, reqUser.name, reqUser.address, reqUser.fbId, reqUser.avatar);
        faster5.users.unshift(resUser); // push to beginning
    }

    req.io.emit('faster5:login', {success: true, user: resUser});

    faster5.log();
};

faster5.search = function (req) {
    var user = faster5.getUserById(req.data.user.id);
    var room = null;

    for (var i = 0; i < faster5.rooms.length; i++) {
        if (faster5.rooms[i].users.length == 1) {
            room = faster5.rooms[i];
            if (room.users[0].id != user.id) {
                room.users.push(user);
            }
            break;
        }
    }

    user.answerIndex = -1;

    if (room == null) {
        // create a new room
        var questions = [
            new Question('1+1=?', ['0', '1', '2', '3'], 2),
            new Question('1+2=?', ['0', '1', '2', '3'], 3),
            new Question('1+3=?', ['0', '4', '2', '3'], 1),
            new Question('1+4=?', ['0', '1', '5', '3'], 2),
            new Question('1+5=?', ['6', '1', '2', '3'], 0)
        ];
        room = new Room('room#' + faster5.rooms.length, [user], questions);
        faster5.rooms.push(room);
    }

    room.questionIndex = 0;

    req.io.leave(user.room);
    user.room = room.id;
    req.io.join(room.id);

    var data = {
        room: room,
        dummyUsers:faster5.dummyUsers
    };

    __io.room(room.id).broadcast('faster5:search', data);
};

faster5.play = function (req) {
    var user = faster5.getUserById(req.data.user.id);
    var room = faster5.getRoomById(req.data.room.id);
    var i;
    var isAllReady = true;

    for(i = 0;i<room.users.length;i++){
        if(room.users[i].id == user.id){
            room.users[i].ready = true;
            break;
        }
    }

    for(i = 0;i<room.users.length;i++){
        if(!room.users[i].ready){
            isAllReady = false;
            break;
        }
    }

    // if others user is not ready --> show waiting dialog
    if(!isAllReady){
        req.io.emit('faster5:play',{notReady: true});
        return;
    }

    faster5.count = 4;

    var countInterval = setInterval(function () {
        faster5.count = faster5.count - 1;

        var data = {
            count: faster5.count
        };

        __io.room(room.id).broadcast('faster5:play', data);

        if (faster5.count <= 0) {
            clearInterval(countInterval);
        }
    }, 1000);

    setTimeout(function () {
        var data = {
            question: room.questions[room.questionIndex]
        };
        __io.room(room.id).broadcast('faster5:play', data);
    }, 4000);

};

faster5.answer = function(req){
    var user = faster5.getUserById(req.data.user.id);
    var room = faster5.getRoomById(req.data.room.id);
    var answerIndex = req.data.answerIndex;
    var data;

    for(var j = 0;j<room.users.length;j++){
        if(room.users[j].id == user.id){
            user.answerIndex = answerIndex;
            break;
        }
    }

    var isAllAnswered = true;

    for(var i = 0;i<room.users.length;i++){
        if(room.users[i].answerIndex < 0){
            isAllAnswered = false;
            break;
        }
    }

    if(!isAllAnswered){
        req.io.emit('faster5:answer',{notAllAnswered:true});
        return;
    }

    data = {
        answerRight: room.questions[room.questionIndex].answerRight,
        answerUsers: room.users
    };
    room.questionIndex++;
    __io.room(room.id).broadcast('faster5:answer', data);

    // game over
    if(room.questionIndex == room.questions.length){
        faster5.gameOver(req);
    }
};

faster5.answerNext = function(req){
    var user = faster5.getUserById(req.data.user.id);
    var room = faster5.getRoomById(req.data.room.id);

    for(var i = 0;i<room.users.length;i++){
        room.users[i].answerIndex = -1;
    }

    var data = {
        question: room.questions[room.questionIndex]
    };
    __io.room(room.id).broadcast('faster5:answerNext', data);
};

faster5.gameOver = function(req){
    var user = faster5.getUserById(req.data.user.id);
    var room = faster5.getRoomById(req.data.room.id);
    var data;

    for(var k = 0;k<room.users.length;k++){
        room.users[k].answerIndex = -1;
    }

    room.questionIndex = 0;

    data = {
        users: room.users
    };
    __io.room(room.id).broadcast('faster5:gameOver',data);
};

faster5.draw = function (req) {
    req.io.broadcast(faster5.baseUrl + ':draw', req.data);
};

faster5.getUserById = function (userId) {
    for (var i = 0; i < faster5.users.length; i++) {
        if (userId == faster5.users[i].id) {
            return faster5.users[i];
        }
    }
    return null;
};

faster5.getRoomById = function (roomId) {
    for (var i = 0; i < faster5.rooms.length; i++) {
        if (roomId == faster5.rooms[i].id) {
            return faster5.rooms[i];
        }
    }
    return null;
};

module.exports = faster5;