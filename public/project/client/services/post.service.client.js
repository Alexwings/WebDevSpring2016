/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .factory("PostService", PostService);
    function PostService($http){
        var api = {
            createPost: create,
            findPostById: findById,
            findPostsByTitle: findByTitle,
            updatePost: update,
            deletePost: deletePost
        }
        return api;
        function create(post){
            return $http.post("/api/project/post", post);
        }
        function findById(id){
            return $http.get("/api/project/post/"+id)
        }
        function findByTitle(title){
            return $http.get("/api/project/post/title/"+title)
        }
        function update(post){
            return $http.put("/api/project/post",post)
        }
        function deletePost(id){
            return $http.delete("/api/project/post/"+id)
        }
    }
})()