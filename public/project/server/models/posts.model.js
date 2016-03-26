/**
 * Created by Alex on 3/25/2016.
 */
module.exports = function(app, db){
    var posts = require("./posts.mock.json");
    var uuid = require("node-uuid");
    var api = {
        CreatePosts: create,
        findPostById: findById,
        findPostsByTitle: findByTitle,
        findPostByImdbID:findByImdb,
        updatePost: update,
        deletePost: remove
    };
    return api;

    function create(post){
        var id = uuid.v1();
        var p = {"_id": id};
        p.Title = post.Title;
        p.Year = post.Year;
        p.Rated = post.Rated;
        p.Director = post.Director;
        p.Actors = post.Actors;
        p.Plot = post.Plot;
        p.Language = post.Language;
        p.Awards = post.Awards;
        p.Poster = post.Poster;
        p.imdbRating = post.imdbRating;
        p.imdbID = post.imdbID;
        p.Type = post.Type;
        p.TotalRating = Post.imdbRating;
        posts.push(p);
        return p;
    }
    function findById(id){
        for(var i = 0; i < posts.length; i++){
            if(posts[i]._id == id){
                return posts[i];
            }
        }
        return null;
    }
    function findByTitle(title, type){
        var results = [];
        for(var i = 0; i < posts.length; i++){
            if(posts[i].Title == title && posts[i].Type == type){
                results.push(posts[i]);
            }
        }
        return results;
    }
    function findByImdb(imdbId){
        for(var i = 0; i < posts.length; i++){
            if(posts[i].imdbID == imdbId){
                return posts[i];
            }
        }
        return null;
    }
    function update(post){
        var p = findById(post._id);
        if(p){
            p._id = post._id;
            p.Title = post.Title;
            p.Year = post.Year;
            p.Rated = post.Rated;
            p.Director = post.Director;
            p.Actors = post.Actors;
            p.Plot = post.Plot;
            p.Language = post.Language;
            p.Awards = post.Awards;
            p.Poster = post.Poster;
            p.imdbRating = post.imdbRating;
            p.imdbID = post.imdbID;
            p.Type = post.Type;
            p.TotalRating = Post.imdbRating;
            return p;
        }
        return null;
    }
    function remove(id){
        for(var i = 0; i < posts.length; i++){
            if(posts[i]._id == id){
                posts.splice(i,1);
                return true;
            }
        }
        return true;
    }
}