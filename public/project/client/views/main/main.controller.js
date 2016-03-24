/**
 * Created by Alex on 3/23/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("MainController", MainController);
    function MainController($scope, $location){
        $scope.location = $location;
    }
})()