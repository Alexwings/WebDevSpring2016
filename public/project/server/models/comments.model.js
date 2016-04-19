/**
 * Created by Alex on 3/25/2016.
 */
module.exports = function(mongoose){
    var CommentSchema = require("./schemas/comment.schema.js")(mongoose);
    var ComModel = mongoose.model('project_comment', CommentSchema);
    var api = {
        CreateComment: create,
        findCommentsByUser: findByUser,
        findCommentsByMovie: findByMoive,
        findCommentById: findById,
        deleteCommentById: remove
    }
    return api;
    function create(comment){
        return ComModel.create(comment);
    }
    function findByUser(username){
        return ComModel.find({user:username});
    }
    function findByMoive(title){
        return ComModel.find({post: title});
    }
    function findById(cid){
        return ComModel.findById(cid);
    }
    function remove(cid){
        return ComModel.remove({_id: cid});
    }
};