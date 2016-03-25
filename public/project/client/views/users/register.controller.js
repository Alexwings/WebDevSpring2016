/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("OnlineMovieApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location, UserService) {
        $scope.register = regist;
        function regist(user){
            var new_user = {"username": user.username, "password": user.password, "roles":["general user"]};
            UserService.createUser(new_user).then(registered, rejected);
        }
        function registered(data){
            UserService.setCurrentUser(data);
            $location.path("user/"+data._id+"/profile");
        }
        function rejected(error){
            alert("Cannot register! Try change another username!");
            console.log("Cannot create user!");
        }
    }
})()
