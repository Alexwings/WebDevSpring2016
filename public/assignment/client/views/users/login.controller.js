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
            if(data.username && data.password){
                $scope.exist = true;
                UserService.setCurrentUser(data);
                $location.path("/profile");
            }else {
                alert("Please fill in username and password!");
            }
        }
        function rejected(error){
            $scope.exist = false;
            console.log("Something wrong with user client service!");
        }
    }
})()