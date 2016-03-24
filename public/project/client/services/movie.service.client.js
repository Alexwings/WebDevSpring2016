/**
 * Created by Alex on 3/24/2016.
 */
//reference Professor's experiments/omdbapi/routing/services/movie.service.js
(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("OnlineMovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMovieByImdbId(imdbId, callback) {
            var url = DETAILS_URL.replace("IMDBID", imdbId);
            return $http.get(url)
        }

        function findMoviesByTitle(title, callback) {
            var url = SEARCH_URL
                .replace("TITLE", title)
                .replace("PAGE", 1);
            return $http.get(url);
        }
    }
})();