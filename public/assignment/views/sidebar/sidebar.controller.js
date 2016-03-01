(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $location){
        $scope.location = $location
        $scope.user = {	"_id":456, "firstName":"Dan", "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]}
    }
})()
