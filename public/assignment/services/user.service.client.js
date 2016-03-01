(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService() {
        var users;
        users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];
        var service = {
            'findUserByCredentials': findUserByCredentials,
            'findAllUsers': findAllUsers,
            'createUser': createUser,
            'deleteUserById': deleteUserById,
            'updateUser': updateUser
        };
        return service
        function findUserByCredentials(username, password, callback) {
            var usr = null;
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.username == username && user.password == password) {
                    usr = user;
                    break;
                }
            }
            callback(usr);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(usr, callback) {
            var new_user = {
                "_id": produceId(new Date()), "firstName": usr.firstName, "lastName": usr.lastName,
                "username": usr.username, "password": usr.password, "roles": usr.roles
            };
            users.push(new_user);
            callback(new_user);
        }
        function produceId(date){
            var id = date.getMilliseconds();
            return id;
        }

        function deleteUserById(usrId, callback) {
            var found = false;
            for (var i = 0; i < users.length; i++) {
                user = users[i];
                if (user._id == usrId) {
                    users.splice(i, 1);
                    found = true;
                    break
                }
            }
            if (!found) {
                alert("No such user!");
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var found = false;
            var result = null;
            for (var i = 0; i < users.length; i++) {
                var usr = users[i];
                if (usr._id == userId) {
                    usr.firstName = user.firstName;
                    usr.lastName = user.lastName;
                    usr.username = user.username;
                    usr.password = user.password;
                    usr.roles = user.roles;
                    found = true;
                    callback(usr);
                    break;
                }
            }
            if (!found) {
                alert("User ID not found!");
            }
        }
    }
})();
