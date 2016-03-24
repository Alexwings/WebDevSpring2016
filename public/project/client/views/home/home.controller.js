/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("HomeController", HomeController);
    function HomeController($scope, $location){
        $scope.req = {};
        $scope.setType = setType;
        $scope.search = search;
        function setType(type){
            $scope.req.type = type;
        }
        function search(req){
            $location.path("/result?title="+req.title+"&type="+req.type);
        }
    }
})()