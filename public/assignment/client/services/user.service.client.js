(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http, $q) {
        var service = {
            'findUserByUsername':findUserByUsername,
            'findAllUsers': findAllUsers,
            'createUser': createUser,
            'findUserById': findUserById,
            'deleteUserById': deleteUserById,
            'updateUser': updateUser,
            'setCurrentUser': setCurrentUser,
            'getCurrentUser': getCurrentUser,
            'login': login,
            'logout': logout,
            'register': register
        };
        return service;
        function register(user){
            return $http.post('/api/assignment/register', user);
        }

        function logout(){
          return $http.post("/api/assignment/logout");
        }
        function login(credentials) {
            return $http.post("/api/assignment/login", credentials);
        }
        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function findUserById(id){
            return $http.get("/api/assignment/user/"+id);
        }

        function createUser(usr) {
            return $http.post("/api/assignment/user", usr);
        }

        function deleteUserById(usrId) {
            return $http.delete("/api/assignment/user/"+usrId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId, user);
        }
        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
       function getCurrentUser(){
            return $rootScope.currentUser;
        }
    }
})();
