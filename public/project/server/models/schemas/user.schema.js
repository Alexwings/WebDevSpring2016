module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        phone: String,
        role: {type: String, enum:['general', 'editor', 'admin'], default: 'general'}
    }, {collection: 'project_user'});
    return UserSchema;
}