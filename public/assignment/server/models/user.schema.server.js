module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        roles: {type:[String], default: ["student"]},
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
    return UserSchema;
};