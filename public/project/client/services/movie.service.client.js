/**
 * Created by Alex on 3/24/2016.
 */
//reference Professor's experiments/omdbapi/routing/services/movie.service.js
(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&type=movie";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&plot=short&r=json";

    angular
        .module("OnlineMovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMovieByImdbId(imdbId) {
            var url = DETAILS_URL
                .replace("IMDBID", imdbId);
            return $http.get(url);
        }

        function findMoviesByTitle(title, type) {
            var url = SEARCH_URL
                .replace("TITLE", title)
                .replace("movie", type);
            return $http.get(url);
        }
    }
})();