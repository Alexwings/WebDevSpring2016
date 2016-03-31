/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, UserService){
        $scope.update = updateInfo;
        function updateInfo(u){
            var usr = {firstName:u.firstName, lastName: u.lastName,
                username: u.username, password: u.password, roles:getRoles()};
            var userId = u._id;
            UserService.updateUser(userId, usr).then(updated, rejected);
            function updated(response){
                if(response.data){
                    UserService.setCurrentUser(response.data);
                }else{
                    alert("Cannot find user!");
                    $location.url("/home");
                }
            }
            function rejected(response){
                console.log("Something wrong with user client services!");
            }
        }
        function getRoles(rols){
            var roles= [];
            var std = $scope.student;
            var fac = $scope.faculty;
            function contains(rol, str){
                for(var i = 0; i < rol.length; i++){
                    if (rol[i] == str) return true;
                }
                return false;
            }
            if(rols){
                for(var i = 0; i < rols.length;i++){
                    roles.push(rols[i]);
                }
            };
            if(std) {
                roles.push("student");
            }
            if(fac) {
                roles.push("faculty");
            }
            return roles;
        }
    }
})()
