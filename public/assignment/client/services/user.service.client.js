(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http, $q) {
        var service = {
            //General user
            'findUserByUsername':findUserByUsername,
            'findUserById': findUserById,
            'updateUser': updateUser,
            'setCurrentUser': setCurrentUser,
            'getCurrentUser': getCurrentUser,
            'login': login,
            'logout': logout,
            'register': register,
            //Admin user
            'findAllUsers': findAllUsers,
            'createUser': createUser,
            'updateUserForAdmin': updateUserForAdmin,
            'deleteUserById': deleteUserById,
            'findUserForAdmin': findUserForAdmin
        };
        return service;
        function findUserForAdmin(id){
            return $http.get("/api/assignment/admin/user/"+id);
        }

        function deleteUserById(usrId) {
            return $http.delete("/api/assignment/admin/user/"+usrId);
        }

        function updateUserForAdmin(userId, user){
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function createUser(usr) {
            return $http.post("/api/assignment/admin/user", usr);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

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

        function findUserById(id){
            return $http.get("/api/assignment/user/"+id);
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
