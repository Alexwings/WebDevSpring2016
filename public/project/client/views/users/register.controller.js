/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("OnlineMovieApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService) {
        model.register = regist;
        function regist(user){
            var new_user = {"username": user.username, "password": user.password, "role":"general"};
            UserService.createUser(new_user).then(registered, rejected);
        }
        function registered(response){
            var data = response.data;
            UserService.setCurrentUser(data);
            $location.path("/user/"+data._id);
        }
        function rejected(response){
            alert("Cannot register! Try change another username!");
            console.log("Cannot create user!");
        }
    }
})()
