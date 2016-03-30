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
            UserService.setCurrentUser(null);
            $location.path("/home");
        }
		function toProfile(user){
			$location.path("/user/"+user._id+"/profile");
		}
    }
})();
