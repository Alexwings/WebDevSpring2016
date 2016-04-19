
module.exports = function(mongoose) {
    var UserSchema = require('./schemas/user.schema.js')(mongoose);
    var UserModel = mongoose.model('project_user', UserSchema);
    var api = {
        'findUserByCredentials': findByCredentials,
        'findUserByUsername':findByUsername,
        'FindAll': findAll,
        'FindById': findUserById,
        'Create': createUser,
        'Delete': removeUser,
        'Update': updateUser,
        'getUserModel': getUserModel
    };
    return api;
    function getUserModel(){
        return UserModel;
    }
    function updateUser(id, user){
        delete user._id;
        return UserModel.update({_id: id}, {$set: user});
    }
    function removeUser(id){
        return UserModel.remove({_id: id});
    }
    function createUser(user){
        return UserModel.create(user);
    }
    function findUserById(id){
        return UserModel.findById(id);
    }
    function findAll(){
        return UserModel.find();
    }
    function findByUsername(username){
        return UserModel.findOne({username: username});
    }
    function findByCredentials(credentials){
        return UserModel.findOne({username:credentials.username, password: credentials.password});
    }
}
