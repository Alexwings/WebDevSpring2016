/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("ResultController", ResultController);
    function ResultController($scope, $location, $routeParams, MovieService, PostService){
        $scope.movies = [];
        $scope.message = false;
        $scope.toDetials = toDetials;
        var title = $routeParams.title;
        var type = $routeParams.type;
        //PostService.findPostsByTitle(title).then(renderSuccess, renderError);
        MovieService.findMoviesByTitle(title, type).then(renderMovie, renderError);
        function toDetials(movie){
            $location.path("/detials/"+movie.title+'/type/'+movie.type);
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
                $scope.movies = response.data.Search;
            }
        }
        function renderError(response){
            $scope.message = true;
        }
    }
})()