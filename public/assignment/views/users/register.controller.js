/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = function (user) {
            var roles = [];
            if (user.std_checked) roles.push("student");
            if (user.fac_checked) roles.push("faculty");
            if (roles.length == 0) {
                alert("Please select roles!!")
            } else if (user.verify != user.password) {
                alert("Password can't be verified!!")
            } else {
                var usr = {
                    "firstName": user.firstName, "lastName": user.lastName,
                    "username": user.username, "password": user.password, "roles": roles
                };
                var callback = function (user) {
                    return user;
                }
                $rootScope.currentUser=UserService.createUser(usr, callback);
                $location.path("/profile");
            }
        }
    }
})()
