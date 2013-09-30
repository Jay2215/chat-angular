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
    $scope.createUser = function (field)
    {
        if (field) {
              $scope.pseudo = field;
              socket.emit('joinChat', $scope.pseudo);
        } else {
            $scope.error = 'You must choose your pseudo.';
        }
    }
});