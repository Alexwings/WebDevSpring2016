(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl:"views/home/home.view.html",
                    //controller: "views/home/home.controller.js"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                   controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    //controller: "views/admin/admin.controller.js"
                })
                .when("/form", {
                    templateUrl: "views/forms/forms.view.html",
                    //controller: "views/forms/forms.controller.js"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
})();
