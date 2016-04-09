(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl:"views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    },
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
                        loggedin: checkLoggedin
                    },
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/form", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/user/:userId/form/:formId/field", {
                    templateUrl:"views/fields/fields.view.html",
                    controller: "FieldController"
                })
                .when("/user/:userId/form/:formId/field/:fieldId", {
                    templateUrl:"views/fields/field.edit.view.html",
                    controller: "EditFieldController"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope){
        var defer = $q.defer();
        $http.get('/api/assignment/loggedin')
            .then(function(response){
                $rootScope.errorMessage = null;
                var user = response.data;
                if(user !== '0' && user.roles.indexOf('admin') != -1){
                    $rootScope.currentUser = user;
                    defer.resolve();
                }else{
                    $rootScope.errorMessage = 'You are not Admin!';
                    defer.reject();
                    $location.url('/home');
                }
            })
        return defer.promise;
    }
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        var defer = $q.defer();
        $http.get('/api/assignment/loggedin')
            .then(function(response){
                $rootScope.errorMessage = null;
                var user = response.data;
                if(user !== '0'){
                    $rootScope.currentUser = user;
                    defer.resolve();
                }else{
                    $rootScope.errorMessage = "please login!";
                    defer.reject();
                    $location.url("/login");
                }
            });
        return defer.promise;
    }
    var checkCurrentUser = function($q, $timeout, $http,  $location, UserService){
        var defer = $q.defer();
        $http.get('/api/assignment/loggedin')
            .then(function(response){
                var user = response.data;
                if(user !== '0'){
                    console.log(user);
                    UserService.setCurrentUser(user);
                }
                defer.resolve();
            });
        return defer.promise;
    };
})();
