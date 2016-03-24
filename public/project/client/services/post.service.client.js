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
        function create(post){
            console.log("Create:");
            console.log(post);
            return $http.post("/api/project/post", post);
        }
        function findById(id){
            console.log(id);
            return $http.get("/api/project/post/"+id)
        }
        function findByTitle(title){
            console.log(title);
            return $http.get("/api/project/post?Title="+title)
        }
        function update(post){
            console.log(post);
            return $http.put("/api/project/post",post)
        }
        function deletePost(id){
            console.log("delete: "+id);
            return $http.delete("/api/project/post/"+id)
        }
    }
})()