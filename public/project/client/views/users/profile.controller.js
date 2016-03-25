/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("OnlineMovieApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, $routeParams, UserService){
        $scope.user = null;
        $scope.update = updateInfo;
        UserService.findUserById($routeParams.id).then(foundUser, rejected);
        if(!$scope.user.equals(UserService.getCurrentUser())){
            $scope.user = UserService.getCurrentUser();
        }
        function foundUser(response){
            if(response.data){
                $scope.user = response.data;
            }else{
                alert("No User Found!");
            }
        }
        function updateInfo(u){
            var usr = {firstName:u.firstName, lastName: u.lastName,
                username: u.username, password: u.password, roles:getRoles(u.student, u.faculty, u.roles)};
            var userId = u._id;
            UserService.updateUser(userId, usr).then(updated, rejected);
        }
        function updated(response){
            if(response.data){
                UserService.setCurrentUser(data);
            }else {
                console.log("Something wrong with user client service!");
            }
        }
        function rejected(error){
            console.log("Something wrong with user client service!");
        }
    }
})()
