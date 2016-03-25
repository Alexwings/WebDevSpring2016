/**
 * Created by Alex on 3/24/2016.
 */
//reference Professor's experiments/omdbapi/routing/services/movie.service.js
(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=TYPE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=short&tomatoes=true";

    angular
        .module("OnlineMovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMovieByImdbId(imdbId, type) {
            var url = DETAILS_URL
                .replace("IMDBID", imdbId)
                .replace("TYPE", type);
            return $http.get(url)
        }

        function findMoviesByTitle(title, type) {
            var url = SEARCH_URL
                .replace("TITLE", title)
                .replace("PAGE", 1)
                .replace("TYPE", type);
            return $http.get(url);
        }
    }
})();