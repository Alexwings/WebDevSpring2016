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
                    controller: "RegisterController",
                    controllerAs: 'model'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: 'model'
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/user/:userId", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                .when("/result/:title/type/:type",{
                    templateUrl: "views/movie/result.view.html",
                    controller: "ResultController"
                })
                .when("/detials/:title/type/:type",{
                    templateUrl: "views/movie/detial.view.html",
                    //controller: "DetialController"
                })
                .when("/admin", {
                    templateUrl:"views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo:"/home"
                })
        })
})();