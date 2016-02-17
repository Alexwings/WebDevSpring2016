(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController($scope, $location));
    function MainController($scope, $location){
        $scope.location = $location;
    }
})
