(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController',HeaderController);
    function HeaderController($scope, $location, UserService)
    {
        $scope.location = $location;
        $scope.logout = logout;
		$scope.toProfile = toProfile;
        function logout(){
            UserService.logout().then(function(response){
                UserService.setCurrentUser(null);
                $location.path("/home");
            })
        }
		function toProfile(user){
			$location.path("/profile");
		}
    }
})();
