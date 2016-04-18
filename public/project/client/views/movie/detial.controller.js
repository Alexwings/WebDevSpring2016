/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("DetialController", DetialController);
    function DetialController($routeParams, $location, MovieService, PostService){
        var model = this;
        var imdbId = $routeParams.imdbId;
        function init(){
            MovieService.findMovieByImdbId(imdbId)
                .then(
                    function(res){
                        var movie = res.data;
                        var post = {
                            "Title": movie.Title,
                            "Year": movie.Year,
                            "Rated": movie.Rated,
                            "Director": movie.Director,
                            "Actors": movie.Actors,
                            "Plot": movie.Plot,
                            "Country": movie.Country,
                            "Awards": movie.Awards,
                            "Poster": movie.Poster,
                            "imdbRating": Number(movie.imdbRating),
                            "imdbID": movie.imdbID,
                            "Type": movie.Type
                        };
                        model.post = post;
                        return PostService.createPost(post);
                    },
                    function(err){
                        $location.url('/home');
                        alert("Oops, an error occurred");
                    }
                )
                .then(
                    function(res){
                        var p = res.data;
                        if(p){
                            model.post = p;
                            console.log("post stored");
                        }else{
                            console.log("post exists");
                        }
                    },
                    function(res){
                        console.log("create post error");
                    }
                );
        }
        init();
    }
})();