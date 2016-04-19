module.exports=function(mongoose){
    var CommentSchema = mongoose.Schema({
        user:String,
        post:String,
        content:String,
        time: {type: Date, default: Date.now()}
    },{collection: 'project_comment'});
    return CommentSchema;
};