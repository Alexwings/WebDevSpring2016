var q = require("q");

module.exports = function(mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('user', UserSchema);
    var api = {
        'findUserByCredentials': findByCredentials,
        'findUserByUsername': findByUsername,
        'FindAll': findAll,
        'FindById': findById,
        'Create': create,
        'Delete': Delete,
        'Update': update,
    };
    return api;
    function findAll(){
        var defer = q.defer();
        UserModel.find(function(err, doc){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(doc);
            }
        })
        return defer.promise;
    }
    function findById(id){
        var defer = q.defer();
        UserModel.findById(id, function(err, doc){
           if(err){
               defer.reject(err);
           } else {
               defer.resolve(doc);
           }
        });
        return defer.promise;
    }
    function findByCredentials(credentials){
        var defer = q.defer();
        UserModel.findOne(
            {username:credentials.username,
            password:credentials.password},
            function(err, doc){
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(doc);
                }
            }
        );
        return defer.promise;
    }
    function findByUsername(username){
        var defer = q.defer();
        UserModel.findOne(
            {username:username},
            function(err, doc){
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(doc);
                }
            }
        )
        return defer.promise;
    }
    function create(user){
        var defer = q.defer();
        //use UserModel to create user
        UserModel.create(user, function(err, doc){
            if(err){
                defer.reject(err);
            }else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }
    function Delete(id){
        var defer = q.defer();
        UserModel.remove(
            {_id:id},
            function(err, stat){
                if(err){
                    defer.reject(err);
                }else {
                    defer.resolve(stat);
                }
            }
        )
        return defer.promise;
    }
    function update(id, user){
        var defer = q.defer();
        UserModel.update(
            {_id: id},
            {$set: user},
            function(err, stat){
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(stat);
                }
            }
        )
        return defer.promise;
    }
}
