/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .factory("CommentService", CommentService);
    function CommentService($http){
        var api={
            creatComment: create,
            findCommentByMovie: findByMovie,
            findCommentByUser: findByUser,
            deleteCommentById: deletById
        }
        return api;
        function create(usrId, mId){
            $http.post()
        }
    }
})()