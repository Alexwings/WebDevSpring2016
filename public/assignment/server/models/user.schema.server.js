module.exports = function(mongoose){
    var UserSchema = mongoose.schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        roles: [String],
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
    return UserSchema;
};