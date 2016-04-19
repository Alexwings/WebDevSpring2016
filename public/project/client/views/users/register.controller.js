/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("OnlineMovieApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService) {
        var model = this
        model.register = regist;
        function regist(user){
            UserService.register(user).then(registered, rejected);
        }
        function registered(response){
            var data = response.data;
            if(data){
                UserService.setCurrentUser(data);
                $location.path("/profile");
            }else{
                alert("Try change another username!");
            }
        }
        function rejected(response){
            model.error = response.error;
        }
    }
})()
