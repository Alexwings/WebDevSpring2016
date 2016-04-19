/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("DetialController", DetialController);
    function DetialController($routeParams, $location, MovieService, PostService, UserService, CommentService){
        var model = this;
        var imdbId = $routeParams.imdbId;
        var user = UserService.getCurrentUser();
        model.submit = addComment;
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
                        return PostService.createPost(model.post);
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
                        };
                        return CommentService.findCommentByMovie(model.post.Title);
                    },
                    function(res){
                        console.log("create post error");
                    }
                )
                .then(
                    function(res){
                        var comms = res.data;
                        model.comments = comms.reverse();
                    },
                    function(res){
                        console.log(res.data);
                    }
                );
        }
        init();
        function addComment(comment){
            comment.user = user.username;
            comment.post = model.post.Title;
            if(user.role && user.role === 'editor'){
                CommentService.createComment(comment)
                    .then(
                        function(res){
                            console.log("Comment created!");
                            return CommentService.findCommentByMovie(model.post.Title);
                        },
                        function(res){
                            console.log("create comment error");
                        }
                    )
                    .then(
                        function(res){
                            var comms = res.data;
                            model.comments = comms.reverse();
                        },
                        function(res){
                            console.log("cannot find comments of this post");
                        }
                    );
            }
        }
    }
})();