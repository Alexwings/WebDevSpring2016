/**
 * Created by Alex on 2/16/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location, UserService) {
        $scope.register = regist;
        function regist(user){
            if ($scope.verify == user.password){
                var new_user = {"username": user.username, "password": user.password};
                UserService.register(new_user).then(registered, rejected);
            }
        }
        function registered(response){
            if(response.data){
                UserService.setCurrentUser(response.data);
                $location.path("/profile");
            }else{
                alert("Register failed, please try again!")
            }
        }
        function rejected(error){
            alert("Cannot register! Try change another username!");
            console.log("Cannot create user!");
        }
    }
})()
