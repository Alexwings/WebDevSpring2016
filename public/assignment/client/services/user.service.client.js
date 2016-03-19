(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http, $q) {
        var service = {
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
        return service
        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="+username+"&password="+password)
                .then(renderSuccess, renderError);
        }
        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username)
                .then(renderSuccess, renderError);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user")
                .then(renderSuccess, renderError);
        }

        function findUserById(id){
            return $http.get("/api/assignment/user/"+id)
                .then(renderSuccess, renderError);
        }

        function createUser(usr) {
            return $http.post("/api/assignment/user", usr)
                .then(renderSuccess, renderError);
        }

        function deleteUserById(usrId) {
            return $http.delete("/api/assignment/user/"+usrId)
                .then(renderSuccess, renderError);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId, user)
                .then(renderSuccess, renderError);
        }
        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        function getCurrentUser(){
            return $rootScope.currentUser;
        }
        function renderSuccess(response){
            if(response.data == null){
                return $q.reject(response.data);
            }
            return response.data;
        }
        function renderError(response){
            return $q.reject(response.data);
        }
    }
})();
