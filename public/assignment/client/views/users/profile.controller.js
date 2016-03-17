/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, UserService){
        $scope.user = UserService.getCurrentUser();
        $scope.update = updateInfo;
        function updateInfo(u){
            var usr = {firstName:u.firstName, lastName: u.lastName,
                username: u.username, password: u.password, roles:getRoles(u.student, u.faculty, u.roles)};
            var userId;
            UserService.findUserByUsername(u.username).then(foundId, rejected);
            UserService.updateUser(usrId, usr).then(updated, rejected);
        }
        function foundId(data){
            userId = data._id;
        }
        function updated(data){
            UserService.setCurrentUser(data);
        }
        function rejected(error){
            console.log("Something wrong with user client service!");
        }
        function getRoles(std, fac, rols){
            var roles= [];
            function contains(rol, str){
                for(var i = 0; i < rol.length; i++){
                    if (rol[i] == str) return true;
                }
                return false;
            }
            if(rols.length){
                for(var i = 0; i < rols.length;i++){
                    roles.push(rols[i]);
                }
            };
            if(std && !contains(roles, "student")) {
                roles.push("student");
            }
            if(fac && !contains(roles, "faculty")) {
                roles.push("faculty");
            }
            return roles;
        }
    }
})()
