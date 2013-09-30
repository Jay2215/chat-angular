var express = require('express');
var app     = express();
var server  = require('http').createServer(app).listen(7777);
var io      = require('socket.io').listen(server);

/**
 * On connection, when a user is connected
 *
 * @author Mathieu MARCHOIS <mathieu.marchois@gmail.com>
 */
io.sockets.on('connection', function(socket) {

    var users       = [];
    var currentUser = null;

    /**
     * When a user join the chat room
     */
    socket.on('joinChat', function(user) {
        // Store current user
        currentUser = user;

        // Store users in array
        users[currentUser.id] = currentUser;

        // Send to all user the new user
        socket.broadcast.emit('newUser', user);
    });

    /**
     * When a user send a message
     */
    socket.on('sendMessage', function (data) {
        console.log('New message send');

        // Send the message to all connected user
        io.sockets.emit('receiveMessage', data);
    });

    /**
     * When a user leave the chat
     */
    socket.on('leaveChat', function() {
        if (currentUser !== null) {
            users.remove(currentUser.id);
        }
    });
});