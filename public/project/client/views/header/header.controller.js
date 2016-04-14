/**
 * Created by Alex on 3/23/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($location, UserService){
        var model = this;
        model.location = $location;
        model.logout = logout;
        model.register = register;
        model.login = login;
        model.pro = pro;
        function logout(){
            UserService.logout()
                .then(
                    function(stat){
                        if(stat){
                            UserService.setCurrentUser(null);
                            $location.url("/home");
                        };
                    },
                    function(err){
                        model.error = err;
                    }
                )
        }
        function register(){
            $location.path("/register");
        }
        function login(){
            $location.path("/login");
        }
        function pro(user){
            $location.path("/profile");
        }
    }
})()