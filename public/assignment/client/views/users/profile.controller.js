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
            UserService.updateUser(u._id, u).then(updated, rejected);
            function updated(response){
                init();
            }
            function rejected(response){
                alert("can't find user");
                $location.url("/home");
            }
        }
    }
})()
