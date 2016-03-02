/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, $rootScope, UserService){
        $scope.user = $rootScope.currentUser;
        $scope.update = function (u) {
            var usrId = null;
            var success = false;
            var usr = {firstName:u.firstName, lastName: u.lastName,
                username: u.username, password: u.password, roles:getRoles(u.student, u.faculty)};

            function getRoles(std, fac){
                var roles = [];
                if(std) roles.push("student");
                if(fac) roles.push("faculty");
                return roles;
            }
            function findUserCallback(v) {
                usrId = v._id;
            }
            function updateCallback(v) {
                usr = v;
                success = true
            }

            UserService.findUserByUsername(u.username, findUserCallback);
            UserService.updateUser(usrId, usr, updateCallback);
            $rootScope.currentUser = usr;
            console.log($rootScope.currentUser)
            console.log(success)
            if(success) alert("User information updated successfully")
        };
    }
})()
