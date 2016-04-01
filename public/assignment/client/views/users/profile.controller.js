/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, UserService){
        function init(){
            if(!$scope.currentUser){
                $location.url("/login");
            }
        }
        init();
        $scope.update = updateInfo;
        function updateInfo(u){
            u.roles = getArray($scope.roles);
            u.emails = getArray($scope.emails);
            u.phones = getArray($scope.phones);
            UserService.updateUser(u._id, u).then(updated, rejected);
            function updated(response){
                $location.url("/profile");
            }
            function rejected(response){
                alert("can't find user");
                $location.url("/home");
            }
            function getArray(str){
                if(!str){
                    return [];
                }else{
                    return str.split(',');
                }
            }
        }
    }
})()
