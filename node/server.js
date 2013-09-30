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

    /**
     * When a user join the chat room
     */
    socket.on('joinChat', function(data) {

        // Send to all user the new user
        socket.broadcast.emit('newUser', data);
    });

    /**
     * When a user send a message
     */
    socket.on('sendMessage', function (data) {
        console.log('New message send');

        // Send the message to all connected user
        io.sockets.emit('receiveMessage', data);
    });

    socket.on('disconnect', function() {

    });
});