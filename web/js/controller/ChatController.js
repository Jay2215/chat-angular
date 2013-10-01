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

    $scope.users = [{name : 'test'},{name : 'test 1'},{name : 'test 2'},{name : 'test 4'},{name : 'Mathieu'}];

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
     *
     * @type {boolean}
     */
    $scope.isConnected = false;

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
            $scope.isConnected = true;
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
            $("#message").val('');
            socket.emit('sendMessage', {
                message : data
            });
        }
    };

    /**
     * When a new user is connected
     */
    socket.on('newUser', function (data) {
        alert("nex user");
        // TODO : display notification box
    });

    /**
     * Store data to display to all user
     */
    socket.on('receiveMessage', function (data) {
        $scope.messages.push(data);
    });
});