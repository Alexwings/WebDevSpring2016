/**
 * Created by Alex on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $rootScope, $location, UserService){
        $scope.exist = true;
        $scope.login = function(user){
            var login_user = null;
            var ext = true
            function findUserCallback(usr){
                login_user = usr;
            }
            UserService.findUserByCredentials(user.username, user.password,findUserCallback);
            if(login_user){
                $rootScope.currentUser = login_user;
                $location.path("/profile");
                ext = true;
            }else ext = false;
            $scope.exist = ext;
        }
    }
})()