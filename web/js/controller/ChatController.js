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
     * User's pseudo
     * @type string
     */
    $scope.pseudo = '';

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
    $scope.createUser = function (data)
    {
        if (data) {
              $scope.pseudo = data;
              socket.emit('joinChat', $scope.pseudo);
        } else {
            $scope.error = 'You must choose your pseudo.';
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
            socket.emit('sendMessage', msg)
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