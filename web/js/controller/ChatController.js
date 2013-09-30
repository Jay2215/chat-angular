/**
 * Chat controller
 *
 * @author Mathieu MARCHOIS <mathieu.marchois@gmail.com>
 */
app.controller('ChatController', function($scope, socket)
{
    /**
     * Store chat messages
     * @type {Array}
     */
    $scope.messages = [
        {
            user    : 'Administrator',
            message : 'Welcome on the chat',
            date    : new Date().toLocaleString()
        }
    ];

    /**
     * User's object
     * @type object
     */
    $scope.user = {};

    /**
     * Display error
     * @type {string}
     */
    $scope.error = '';

    /**
     * Create a user on login form
     *
     * @param string field
     */
    $scope.createUser = function ()
    {
        if ($scope.user.pseudo && $scope.user.email) {
            $scope.user.id = $scope.user.email.replace('@', '-').replace('.', '-');
            socket.emit('joinChat', $scope.user);
        } else {
            $scope.error = 'You must choose your pseudo and email.';
        }
    }

    /**
     * When a user send an message
     */
    $scope.submitMessage = function(data)
    {
        if (data) {
            var msg = {
                message : data,
                user    : $scope.pseudo,
                date    : new Date().toLocaleString()
            };
            socket.emit('sendMessage', {
                message : data
            })
        }
    };

    /**
     * When a new user is connected
     */
    socket.on('newUser', function (data) {
        // TODO : display notification box
    });

    /**
     * Store data to display to all user
     */
    socket.on('receiveMessage', function (data) {
        $scope.messages.push(data);
    });
});