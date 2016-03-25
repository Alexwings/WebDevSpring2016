(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("OmdbApi")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMovieByImdbId(imdbId, callback) {
            var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }

        function findMoviesByTitle(title) {
            var url = SEARCH_URL
                .replace("TITLE", title)
                .replace("PAGE", 1);
            return $http.get(url).then(Success, Error);
        }
        function Success(response){
            return response;
        }
        function Error(response){
            return response;
        }
    }
})();