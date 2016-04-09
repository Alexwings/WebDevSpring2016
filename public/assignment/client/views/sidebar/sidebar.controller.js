(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $rootScope, $location){
        $scope.location = $location
		$scope.toProfile = toProfile;
		function toProfile(user){
			$location.path("/profile");
		}
    }
})()
