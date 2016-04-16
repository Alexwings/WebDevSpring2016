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
            UserService.findAllUsers()
                .then(
                    function(res){
                        model.users = res.data;
                    },
                    function(res){
                        model.errorMessage = res.err;
                    }
                );
        }
        init();
        function selectUser(index){
            if(model.selectedIndex == index){
                model.selectedIndex = null;
                model.selected = null;
            }else{
                model.selectedIndex = index;
                model.selected = angular.copy(model.users[index]);
            }
        }

        function removeUser(user){
            UserService.deleteUserById(user._id)
                .then(
                    function(res){
                        model.users = res.data;
                    },
                    function(res){
                        model.errorMessage = res.data;
                    }
                );
            if(model.selected && model.selected._id === user._id){
                model.selected = null;
                model.selectedIndex = null;
            }
        }

        function updateUser(user){
            UserService.updateUserForAdmin(user)
                .then(
                    function(res){
                        model.users = res.data;
                    },
                    function(res){
                        model.errorMessage = res.data;
                    }
                );
        }

        function addUser(userProto){
            userProto.password = userProto.username;
            UserService.createUser(userProto)
                .then(
                    function(res){
                        model.users = res.data;
                        if(model.selected){
                            model.selected = null;
                            model.selectedIndex = null;
                        }
                    },
                    function(res){
                        model.errorMessage = res.data;
                    }
                );
        }

        function sort(attr) {
            var sortedUser = angular.copy(model.users);
            sortedUser.sort(
                function (usr1, usr2) {
                    var com1 = usr1[attr].toLowerCase();
                    var com2 = usr2[attr].toLowerCase();
                    return com1 > com2;
                }
            );
            model.users = sortedUser;
        }
    }
})();