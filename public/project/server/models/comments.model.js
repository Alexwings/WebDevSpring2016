/**
 * Created by Alex on 3/25/2016.
 */
module.exports = function(app, db){
    var comments = require("./comments.mock.json");
    var uuid = require("node-uuid");
    var api = {
        CreateComment: create,
        findCommentsByUser: findByUser,
        findCommentsByMovie: findByMoive,
        deleteCommentById: remove
    }
    return api;
    function create(userId, movieId, comment){
        var com = {};
        com._id = uuid.v1();
        com.user = userId;
        com.movie = movieId;
        com.plot = comment;
        comments.push(com);
        return com;
    };
    function findByUser(id){
        var coms = [];
        for(var i = 0; i < comments.length; i++){
            if(comments[i].user == id){
                coms.push(comments[i]);
            }
        }
        return coms;
    };
    function findByMoive(id){
        var mvs = [];
        for(var i = 0; i < comments.length; i++){
            if(comments[i].movie == id){
                mvs.push(comments[i]);
            }
        }
        return mvs;
    };
    function remove(cid){
        for(var i = 0; i < comments.length; i++){
            if(comments[i]._id == cid){
                comments.splice(i, 1);
                return true
            }
        }
        return false;
    };
}