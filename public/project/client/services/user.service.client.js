(function () {
    angular
        .module("OnlineMovieApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http) {
        var api = {
            'findUserByCredentials': findUserByCredentials,
            'findUserByUsername':findUserByUsername,
            'findAllUsers': findAllUsers,
            'createUser': createUser,
            'findUserById': findUserById,
            'deleteUserById': deleteUserById,
            'updateUser': updateUser,
            'setCurrentUser': setCurrentUser,
            'getCurrentUser': getCurrentUser
        };
        return api;
        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user/username/"+username+"/password/"+password);
        }
        function findUserByUsername(username){
            return $http.get("/api/project/user/username/"+username);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function findUserById(id){
            return $http.get("/api/project/user/"+id);
        }

        function createUser(usr) {
            return $http.post("/api/project/user", usr);
        }

        function deleteUserById(id) {
            return $http.delete("/api/project/user/"+id);
        }

        function updateUser(id, user) {
            return $http.put("/api/project/user/"+id, user);
        }
        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        function getCurrentUser(){
            return $rootScope.currentUser;
        }
    }
})();
