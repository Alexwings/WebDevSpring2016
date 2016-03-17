/**
 * Created by Alex on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, UserService){
        $scope.exist = true;
        $scope.login = verifyUser;
        function verifyUser(user){
            UserService.findUserByCredentials(user.username, user.password).then(verified, rejected);
        }
        function verified(data){
            $scope.exist = true;
            UserService.setCurrentUser(data);
            $location.path("/profile");
        }
        function rejected(error){
            $scope.exist = false;
            console.log("Something wrong with user client service!");
        }
    }
})()