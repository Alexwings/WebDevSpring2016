(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl:"views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        getLogin: getLogin
                    }
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
                    controller: "ProfileController",
                    resolve: {
                        checkLogin: checkLogin
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    //controller: "views/admin/admin.controller.js"
                })
                .when("/form", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {
                        checkLogin: checkLogin
                    }
                })
                .when("/user/:userId/form/:formId/field", {
                    templateUrl:"views/fields/fields.view.html",
                    controller: "FieldController",
                    resolve: {
                        checkLogin: checkLogin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });

    function checkLogin(UserService, $q, $location){
        var deferred = $q.defer();
        UserService.getCurrentUser().then(function(response){
            var currentUser = response.data;
            if(currentUser){
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            }else{
                deferred.reject();
                $location.url("/login");
            }
        });
        return deferred.promise;
    }
    function getLogin(UserService, $q){
        var defer = $q.defer();
        UserService.getCurrentUser().then(function(response){
            var currentUser = response.data;
            UserService.setCurrentUser(currentUser);
            defer.resolve();
        });
        return defer.promise;
    }
})();
