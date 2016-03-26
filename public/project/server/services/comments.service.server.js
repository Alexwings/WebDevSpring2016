module.exports = function(app, API, db) {
    var api = API;
    //CreateComment
    app.post("/api/project/user/:userId/movie/:movieId/comment", function(req, res){
        var comment = req.body;
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var new_comment = api.CreateComment(userId, movieId, comment);
        res.send(new_comment);
    })
    //findCommentsByUser
    app.get("/api/projcet/user/:id/comment", function(req, res){
        var id = req.params.id;
        var comments = api.findCommentsByUser(id);
        res.send(comments);
    })
    //findCommentsByMovie
    app.get("/api/project/movie/:id/comment", function(req, res){
        var id = req.params.id;
        var comments = api.findCommentsByMovie(id);
        res.send(comments);
    })
    //deleteCommentById
    app.delete("/api/project/comment/:id", function(req, res){
        var id = req.params.id;
        var success = api.deleteCommentById(id);
        res.send(success);
    })
}