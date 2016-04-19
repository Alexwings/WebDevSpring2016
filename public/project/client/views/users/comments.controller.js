(function(){
    angular
        .module("OnlineMovieApp")
        .controller("UserCommentController", UserCommentController);
    function UserCommentController($location, UserService, CommentService){
        var model = this;
        model.sort = sort;
        model.removeComment = remove;
        model.back = back;
        function init(){
            var user = UserService.getCurrentUser();
            model.user = user;
            CommentService.findCommentByUser(user.username)
                .then(
                    function(res){
                        model.comments = res.data;
                    }
                );
        }
        init();
        function sort(attr){
            var sorted = angular.copy(model.comments);
            sorted.sort(
                function (c1, c2) {
                    var com1 = c1[attr].toLowerCase();
                    var com2 = c2[attr].toLowerCase();
                    return com1 > com2;
                }
            );
            model.comments = sorted;
        }
        function remove(id){
            CommentService.deleteCommentById(id)
                .then(
                    function(res){
                        console.log(res.data);
                        return CommentService.findCommentByUser(model.user.username);
                    },
                    function(res){
                        console.log("fail to delete!");
                    }
                )
                .then(
                    function(res){
                        model.comments = res.data;
                    },
                    function(res){
                        console.log("fail to fetch data");
                    }
                );
        }
        function back(){
            $location.url("/profile");
        }
    }
})();