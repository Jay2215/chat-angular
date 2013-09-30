// Init socket IO, listen on port 7777
var io = require('socket.io').listen(7777);

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
        console.log(data);
    });
});

