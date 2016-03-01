/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, $rootScope, UserService){
        $scope.user = $rootScope.currentUser;
        var update = function (user) {
            var callback = function (user) {
                return user;
            }
            var usr = UserService.findUserByCredentials(user.username, user.password, callback);
            var updatedUser = Userservice.updateUser(usr._id, user, callback);
            $rootScope.currentUser = updatedUser;
            $location.path("/profile");
        };
    }
})()
