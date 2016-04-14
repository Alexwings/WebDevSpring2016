/**
 * Created by Alex on 2/16/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("LoginController", LoginController);
    function LoginController($location, UserService){
        var model = this
        model.login = verifyUser;
        function init(){
            UserService.setCurrentUser = null;
        }
        init();
        function verifyUser(user){
            UserService.login(user.username, user.password).then(verified, rejected);
        }
        function verified(response){
            if(response.data){
                console.log(response.data);
                UserService.setCurrentUser(response.data);
                $location.path("/user/"+response.data._id);
            }else {
                alert("Please fill in username and password!");
            }
        }
        function rejected(response){
            console.log("Something wrong with user client services!");
        }
    }
})()