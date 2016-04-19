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
                    controller: "HomeController",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedin: checkLoggedin
                    }
                })
                .when("/result/:title/type/:type",{
                    templateUrl: "views/movie/result.view.html",
                    controller: "ResultController",
                    controllerAs: 'model',
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/detials/post/imdbId/:imdbId",{
                    templateUrl: "views/movie/detial.view.html",
                    controller: "DetialController",
                    controllerAs: 'model',
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/admin", {
                    templateUrl:"views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .when("/user/comments",{
                    templateUrl: "views/users/comments.view.html",
                    controller: "UserCommentController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo:"/home"
                })
        });

    function checkAdmin($q, $http, $location, UserService){
        var defer = $q.defer();
        $http.get('/api/project/loggedin')
            .then(
                function(res){
                    var user = res.data;
                    if(user !== '0'){
                        if(user.role === 'admin'){
                            UserService.setCurrentUser(user);
                            defer.resolve();
                        }else{
                            defer.reject();
                            $location.url('/home');
                        }
                    }else{
                        defer.reject();
                        $location.url('/login');
                    }
                }
            );
        return defer.promise;
    }
    function checkLoggedin($q, $http, $location, $rootScope, UserService){
        var defer = $q.defer();
        $http.get('/api/project/loggedin')
            .then(
                function(response){
                    var user = response.data;
                    if(user !== '0'){
                        UserService.setCurrentUser(user);
                        defer.resolve();
                    }else{
                        $rootScope.errorMessage = 'Please login!';
                        defer.reject();
                        $location.url('/login');
                    }
                }
            );
        return defer.promise;
    }
    function checkCurrentUser($q, $http, UserService){
        var defer = $q.defer();
        $http.get('/api/project/loggedin')
            .then(
                function(response){
                    var user = response.data;
                    if(user !== '0'){
                        UserService.setCurrentUser(user);
                    }
                    defer.resolve();
                });
        return defer.promise;
    }
})();