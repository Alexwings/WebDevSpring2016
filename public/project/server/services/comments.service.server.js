module.exports = function(app, API) {
    var api = API;
    app.post("/api/project/comment", createComment);
    app.get("/api/project/comment/user/:username", findByUser);
    app.get("/api/project/comment/post/:title", findByPost);
    app.get("/api/project/comment/:id", findById);
    app.delete("/api/project/comment/:id", deleteComment);
    //CreateComment
    function createComment(req, res){
        var comment = req.body;
        api.CreateComment(comment)
            .then(
                function(c){
                    res.json(c);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //findCommentsByUser
    function findByUser(req, res){
        var username = req.params.username;
        api.findCommentsByUser(username)
            .then(
                function(coms){
                    res.json(coms);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //findCommentsByMovie
    function findByPost(req, res){
        var title = req.params.title;
        api.findCommentsByMovie(title)
            .then(
                function(coms){
                    res.json(coms);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //findById
    function findById(req,res){
        var id = req.params.id;
        api.findCommentById(id)
            .then(
                function(comment){
                    res.json(comment);
                },
                function(err){
                    res.status(404).send(err);
                }
            );
    }
    //deleteCommentById
     function deleteComment(req, res){
         var id = req.params.id;
         api.deleteCommentById(id)
             .then(
                 function(stat){
                     res.send(stat);
                 },
                 function(err){
                     res.status(400).send(err);
                 }
             );
    }
};