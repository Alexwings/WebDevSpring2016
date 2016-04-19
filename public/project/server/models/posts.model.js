/**
 * Created by Alex on 3/25/2016.
 */
module.exports = function(mongoose){
    var PostSchema = require("./schemas/post.schema.js")(mongoose);
    var PostModel = mongoose.model('project_post', PostSchema);
    var api = {
        CreatePosts: createPost,
        findPostById: findPostById,
        findPostsByTitle: findByTitle,
        findPostByTitle:findPostByTitle,
        updatePost: update,
        deletePost: removePost
    };
    return api;

    function createPost(post){
        return PostModel.create(post);
    }
    function findPostById(id){
        return PostModel.findById(id);
    }
    function findByTitle(title, type){
        var set = {Title: title, Type: type};
        return PostModel.find(set);
    }
    function findPostByTitle(title){
        return PostModel.findOne({Title: title});
    }
    function update(id, post){
        delete post._id;
        return PostModel.update({_id: id}, {$set: post});
    }
    function removePost(id){
        return PostModel.remove({_id: id});
    }
}