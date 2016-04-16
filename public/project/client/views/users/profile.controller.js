/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("OnlineMovieApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($location, UserService){
        var model = this;
        model.update = updateInfo;
        function init(){
            model.user = UserService.getCurrentUser();
        }
        init();
        function updateInfo(u){
            UserService.updateUser(u._id, u).then(updated, rejected);
        }
        function updated(response){
            init();
            alert("User info updated");
        }
        function rejected(error){
            console.log("Something wrong with user client services!");
        }
    }
})()
