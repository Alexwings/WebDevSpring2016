/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("DetialController", DetialController);
    function DetialController($scope, $routeParams, MovieService, PostService){
        $scope.model = null;
        var type = $routeParams.type;
        var imdbId = $routeParams.imdbId;
        PostService.findMovieById(imdbId).then(renderSuccess, renderError);
        MovieService.findMovieByImdbId(imdbId,type).then(renderMovie, renderError);
        function renderSuccess(response){
            if(response.data){
                $scope.model = response.data;
            }
        }
        function renderMovie(response){
            if(response.data){
                $scope.model= response.data;
            }
        }
        function renderError(response){
            alert("Oops! Error occured!");
        }
    }
})()