var express = require('express');
var app     = express();
var server  = require('http').createServer(app).listen(8080);
var io      = require('socket.io').listen(server);
var md5     = require('MD5');

/**
 * Array which contain all connected user
 * @type {Array}
 */
var users = {};

/**
 * On connection, when a user is connected
 *
 * @author Mathieu MARCHOIS <mathieu.marchois@gmail.com>
 */
io.sockets.on('connection', function(socket) {

    /**
     * Current connected user. One socket by user
     */
    var currentUser = false;

    for (var k in users) {
        socket.emit('newUser', users[k]);
    }

    /**
     * When a user join the chat room
     */
    socket.on('joinChat', function(user) {
        console.log('DEGUB : new user joined chat');
        // Store current user
        currentUser = user;

        // Store users in array
        users[currentUser.id] = currentUser;
        //console.log(users);

        // Send to all user the new user
        io.sockets.emit('newUser', user);

    });

    /**
     * When a user send a message
     */
    socket.on('sendMessage', function (data) {
        console.log('DEGUB : user send a message');

        // Send the message to all connected user
        io.sockets.emit('receiveMessage', data);
    });

    /**
     * When a user leave the chat
     */
    socket.on('disconnect', function() {
        if (currentUser !== false) {
            console.log('DEGUB : user leave chat');
            socket.broadcast.emit('leaveChat', currentUser);
            delete users[currentUser.id];
            console.log(users);
        }
    });
});