var users = require("./user.mock.json");

module.exports = function(app, db) {
    var api = {
        'findUserByCredentials': findByCredentials,
        'findUserByUsername':findByUsername,
        'FindAll': findAll,
        'FindById': findById,
        'Create': create,
        'Delete': remove,
        'Update': update,
    };
    return api;
    function findAll(){
        return users;
    }
    function findById(id){
        for(var i =0; i < users.length; i++){
            var usr = users[i];
            if(usr._id == id){
                return usr;
            }
        }
        return null;
    }
    function findByCredentials(credentials){
        for(var i = 0; i < users.length; i++){
            var usr = users[i];
            if(usr.username == credentials.username && usr.password == credentials.password){
                return usr;
            }
        }
        return null;
    }
    function findByUsername(username){
        for(var i = 0; i < users.length; i++){
            if(users[i].username == username){
                return users[i];
            }
        }
        return null;
    }
    function create(user){
        var found = findByUsername(user.username);
        if(!found){
            var usr = {"_id": produceId(new Date()), "firstName": user.firstName, "lastName": user.lastName,
                "username": user.username, "password": user.password, "roles": user.roles}
            users.push(usr);
            return usr;
        }
        return null;
    }
    function remove(id){
        for(var i = 0; i < users.length; i++){
            var userId = users[i]._id;
            if(userId == id){
                users.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    function update(id, user){
        var usr = findById(id);
        if (usr){
            usr.firstName = user.firstName;
            usr.lastName = user.lastName;
            usr.username = user.username;
            usr.password = user.password;
            usr.roles = user.roles;
        }
        return usr;
    }
    function produceId(date){
        var id = date.getTime();
        return id;
    }
}
