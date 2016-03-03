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
                new_user = {
                    "firstName": null, "lastName": null,
                    "username": user.username, "password": user.password, "roles": []
                };
                var callback = function (user) {
                    UserService.setCurrentUser(user);
                }
                UserService.createUser(new_user, callback);
                $location.path("/profile");
            }
        }
    }
})()
