(function () {
    angular
        .module("OnlineMovieApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http) {
        var api = {
            //for admin
            'createUser': createUser,
            'findAllUsers': findAllUsers,
            //'findUserForAdmin': findUserForAdmin,
            //'updateUserForAdmin': updateUserForAdmin,
            'deleteUserById': deleteUserById,
            //for general
            'register': register,
            'login': loginUser,
            //'logout': logoutUser,
            'findUserByUsername':findUserByUsername,
            'findUserById': findUserById,
            'updateUser': updateUser,
            //General purpose
            'setCurrentUser': setCurrentUser,
            'getCurrentUser': getCurrentUser
        };
        return api;
        //General purpose
        function getCurrentUser(){
            return $rootScope.currentUser;
        }
        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        //for general
        function loginUser(username, password) {
            var credentials = {username: username, password: password};
            return $http.post("/api/project/login", credentials);
        }
        function register(user){
            return $http.post("/api/project/register", user);
        }

        //==========================================

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
    }
})();
