/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location, UserService) {
        $scope.register = function (user) {
            var new_user = null;
            if (user.verify != user.password) {
                alert("Password can't be verified!!")
            } else {
                new_user = {"username": user.username, "password": user.password};
                var registed_user = UserService.createUser(new_user);
                UserService.setCurrentUser(registed_user);
                $location.path("/profile");
            }
        }
    }
})()
