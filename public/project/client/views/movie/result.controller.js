/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("ResultController", ResultController);
    function ResultController($location, $routeParams, MovieService, PostService){
        var model = this;
        model.message = false;
        model.imdbmessage = false;
        model.toDetials = toDetials;
        var title = $routeParams.title;
        var type = $routeParams.type;
        function init(){
            PostService.findPostsByTitle(title, type)
                .then(
                    function(res){
                        var ps = res.data;
                        console.log(res.data);
                        if(ps.length > 0){
                            model.posts = ps;
                        }else{
                            model.message = true;
                        }
                    },
                    function(res){
                        model.message = true;
                        alert("Error Occurred when retrieving movie info!");
                    }
                );
            MovieService.findMoviesByTitle(title, type)
                .then(
                    function(res){
                       var movieInfo = res.data;
                        if(movieInfo.Response == "True"){
                            model.movies = res.data.Search;
                        }else{
                            model.imdbmessage = true;
                        }
                    },
                    function(err){
                        model.imdbmessage = true;
                        model.errorMessage = err;
                    }
                );
        }
        init();
        function toDetials(movie) {
            $location.url("/detials/post/imdbId/" + movie.imdbID);
        }
    }
})();