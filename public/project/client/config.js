/**
 * Created by Alex on 3/22/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl:"views/users/register.view.html",
                    //controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    //controller: "LoginController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/user/:id/profile", {
                    templateUrl: "views/users/profile.view.html",
                    //controller: "ProfileController"
                })
                .when("/result/:title",{
                    templateUrl: "views/movie/result.view.html",
                    controller: "ResultController"
                })
                .when("/detials/:title?/:type",{
                    templateUrl: "views/movie/detial.view.html",
                    //controller: "DetialController"
                })
                .otherwise({
                    redirectTo:"/home"
                })
        })
})();