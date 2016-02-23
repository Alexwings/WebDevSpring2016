(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $location){
        $scope.location = $location;
        var url = $location.url();
        $scope.homeActive = {
            'active': url.indexOf('home') != -1
        }
        $scope.profileActive = {
            'active': url.indexOf('profile') != -1
        }
        $scope.formActive = {
            'active': url.indexOf('form') != -1
        }
        $scope.adminActive = {
            'active': url.indexOf('admin') != -1
        }
    }
})()
