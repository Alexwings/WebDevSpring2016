(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&Type=movie";

    angular
        .module("OmdbApi")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, MovieService) {

        $scope.movieTitle = "Star Wars";

        function init() {
            var movieTitle = $routeParams.title;
            if(movieTitle) {
                fetchMovie(movieTitle);
            }
        }
        init();

        function fetchMovie(movieTitle) {
            MovieService.findMoviesByTitle(movieTitle).then(function(response){
                $scope.data = response;
            }, function(response){
                console.log(response.Error);
            });
        }

        function renderMovies(response) {
            $scope.data = response;
        }
    }
})();