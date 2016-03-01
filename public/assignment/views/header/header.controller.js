(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController',HeaderController);
    function HeaderController($scope, $location, $rootScope)
    {
        $scope.location = $location;
        $scope.user = $rootScope.currentUser;
    }
})();
