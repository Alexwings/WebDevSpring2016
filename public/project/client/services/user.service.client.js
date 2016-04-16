(function () {
    angular
        .module("OnlineMovieApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http) {
        var api = {
            //for admin
            'createUser': createUser,
            'findAllUsers': findAllUsers,
            'findUserForAdmin': findUserForAdmin,
            'deleteUserById': deleteUserById,
            'updateUserForAdmin': updateUserForAdmin,
            //for general
            'register': register,
            'login': loginUser,
            'logout': logoutUser,
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
        function updateUser(id, user) {
            return $http.put("/api/project/user/"+id, user);
        }
        function findUserById(id){
            return $http.get("/api/project/user/"+id);
        }
        function findUserByUsername(username){
            return $http.get("/api/project/user/username/"+username);
        }
        function logoutUser(){
            return $http.post("/api/project/logout");
        }
        function loginUser(username, password) {
            var credentials = {username: username, password: password};
            return $http.post("/api/project/login", credentials);
        }
        function register(user){
            return $http.post("/api/project/register", user);
        }
        //for admin
        function updateUserForAdmin(user){
            return $http.put('/api/project/admin/'+user._id, user);
        }
        function deleteUserById(id){
            return $http.delete('/api/project/admin/'+id);
        }
        function findUserForAdmin(id){
            return $http.get('/api/project/admin/'+id);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin");
        }
        function createUser(usr) {
            return $http.post("/api/project/admin", usr);
        }
    }
})();
