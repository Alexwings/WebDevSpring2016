/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("OnlineMovieApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($location, $routeParams, UserService){
        function init(){
            model.user = {};
            var userId = $routeParams.userId;
            UserService.findUserById(userId).then(foundUser, rejected);
           /* if(!model.user == (UserService.getCurrentUser())){
                model.user = UserService.getCurrentUser();
            }*/
        }
        init();
        model.update = updateInfo;
        function foundUser(response){
            if(response.data){
                model.user = response.data;
            }else{
                alert("No User Found!");
            }
        }
        function updateInfo(u){
            var usr = {firstName:u.firstName, lastName: u.lastName,
                username: u.username, password: u.password, roles:getRoles(u.student, u.faculty, u.roles)};
            var userId = u._id;
            UserService.updateUser(userId, usr).then(updated, rejected);
        }
        function updated(response){
            if(response.data){
                UserService.setCurrentUser(data);
            }else {
                console.log("Something wrong with user client services!");
            }
        }
        function rejected(error){
            console.log("Something wrong with user client services!");
        }
    }
})()
