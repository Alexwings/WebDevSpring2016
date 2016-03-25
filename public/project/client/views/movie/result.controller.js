/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("ResultController", ResultController);
    function ResultController($scope, $location, $routeParams, MovieService){
        $scope.movies = [];
        $scope.message = false;
        $scope.toDetials = toDetials;
        console.log($routeParams);
        var title = $routeParams.title;
        var type = $routeParams.Type;
        //PostService.findMoviesByTitle(title, type).then(renderSuccess, renderError);
        MovieService.findMoviesByTitle(title, type).then(renderMovie, renderError);
        function toDetials(movie){
            $location.path("/detials/"+movie.title+"?imdbId="+movie.imdbID+"&type="+movie.type);
        }
        function renderSuccess(response){
            if(response.data){
                console.log(response.data);
                $scope.movies = response.data;
            }
        }
        function renderMovie(response){
            if(response.data.Response == "False"){
                $scope.message = true;
            }else{
                $scope.movies = response.data;
            }
        }
        function renderError(response){
            $scope.message = true;
        }
    }
})()