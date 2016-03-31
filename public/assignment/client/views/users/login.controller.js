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
            var credentials = {username: user.username, password: user.password};
            UserService.login(credentials).then(verified, rejected);
        }
        function verified(reponse){
            var data = reponse.data;
            if(data){
                $scope.exist = true;
                UserService.setCurrentUser(data);
                $location.path("/profile");
            }else {
                alert("Cannot find password or username!");
            }
        }
        function rejected(response){
            $scope.exist = false;
            console.log("Something wrong with user client services!");
        }
    }
})()