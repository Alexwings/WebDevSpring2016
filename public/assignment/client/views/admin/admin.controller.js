/**
 * Created by Alex on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);
    function AdminController($scope, UserService){
        $scope.sort = sort;
        $scope.addUser = create;
        $scope.remove = removeUser;
        $scope.select = selectUser;
        $scope.updateUser = updateUser;
        function init(){
            UserService.findAllUsers()
                .then(
                    function(response){
                        if(response.data){
                            $scope.users = response.data;
                        }
                    },
                    function(err){
                        $scope.error = err;
                    }
                );
            $scope.sortAttr = {};
        }
        init();
        function updateUser(user){
            UserService.updateUser(user._id, user)
                .then(
                    function(response){
                        $scope.users = response.data;
                    },
                    function(err){
                        $scope.error = err;
                    }
                )
        }

        function selectUser(index){
            if($scope.selectedIndex == index){
                $scope.selected = null;
                $scope.selectedIndex = null;
            }else{
                $scope.selectedIndex = index;
                $scope.selected = angular.copy($scope.users[index]);
            }
        }

        function removeUser(user){
            UserService.deleteUserById(user._id)
                .then(
                    function(response){
                        $scope.users = response.data;
                        $scope.selected = null;
                        $scope.selectedIndex = null;
                    },
                    function(err){
                        $scope.error = err;
                    }
                )
        }

        function create(user){
            UserService.createUser(user)
                .then(
                    function(response){
                        $scope.users = response.data;
                    },
                    function(err){
                        $scope.error = err;
                    }
                )
        }
        function sort(arg){
            var status = angular.copy($scope.sortAttr);
            status.by = arg;
            if(!status.hasOwnProperty('direction')){
                status.direction = true;
            }else{
                status.direction = !status.direction;
            }
            //TODO: add sort method;

            $scope.sortAttr = status;
        }
    }
})()