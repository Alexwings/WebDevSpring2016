/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .factory("CommentService", CommentService);
    function CommentService($http){
        var api={
            createComment: create,
            findCommentByMovie: findByMovie,
            findCommentByUser: findByUser,
            deleteCommentById: deleteById
        };
        return api;
        function create(comment){
            return $http.post("/api/project/comment", comment);
        }
        function findByMovie(title) {
            return $http.get("/api/project/comment/post/"+title);
        }
        function findByUser(title) {
            return $http.get("/api/project/comment/user/"+title);
        }
        function deleteById(id) {
            return $http.delete("/api/project/comment/"+id);
        }
    }
})();