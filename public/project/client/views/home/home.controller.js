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
            if(req.type){
                $location.path("/result/"+req.name+"/type/"+req.type);
            }else {
                $location.path("/result/"+req.name+"/type/"+"movie");
            }
        }
    }
})()