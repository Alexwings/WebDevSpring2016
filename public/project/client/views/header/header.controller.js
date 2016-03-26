/**
 * Created by Alex on 3/23/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $location, UserService){
        $scope.location = $location;
        $scope.logout = logout;
        $scope.register = register;
        $scope.login = login;
        $scope.pro = pro;
        function logout(){
            UserService.setCurrentUser(null);
            $location.path("/home");
        }
        function register(){
            $location.path("/register");
        }
        function login(){
            $location.path("/login");
        }
        function pro(user){
            $location.path("/user/"+user.id);
        }
    }
})()