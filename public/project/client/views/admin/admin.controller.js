(function(){
    angular
        .module("OnlineMovieApp")
        .controller('AdminController', AdminController);
    function AdminController($location, UserService){
        var model = this;
        model.sort = sort;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.removeUser = removeUser;
        model.selectUser = selectUser;
        function init(){
            //TODO initiate the admin page, get all users
            console.log("admin page initiated");
        }

        function selectUser(index){
            if(model.selectedIndex == index){
                model.selectedIndex = null;
                model.selected = null;
            }else{
                model.selectedIndex = index;
                model.selected = angular.copy(model.users);
            }
        }

        function removeUser(user){
            //TODO remove given user
        }

        function updateUser(user){
            //TODO updeate current selected user
        }

        function addUser(userProto){
            //TODO create user with default password 123
        }

        function sort(attr) {
            var sortedUser = angular.copy(model.users);
            sortedUser.sort(
                function (usr1, usr2) {
                    var com1 = usr1[attr].toLowerCase();
                    var com2 = usr2[attr].toLowerCase();
                    return com1 < com2;
                }
            );
            model.users = sortedUser;
        }
    }
})();