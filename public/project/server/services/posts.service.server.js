module.exports = function(app, API, db){
    var api = API;
    //CreatePosts
    app.post("/api/project/post", function(req, res){
        var post = req.body;
        var new_post = api.CreatePost(post);
        res.json(new_post);
    });
    //findPostById
    app.get("/api/project/post/:id", function(req, res){
        var pid = req.params.id;
        var p = api.findPostById(pid);
        res.json(p);
    })
    //findPostsByTitle
    app.get("/api/project/post/title/:title", function(req, res){
            var posts = api.findPostsByTitle(req.params.title);
            res.send(posts);
    });
    //updatePost
    app.put("/api/project/post", function(req, res){
        var post = req.body;
        var new_post = api.updatePost(post);
        res.send(new_post);
    })
    //deletePost
    app.delete("/api/project/post/:id", function(req, res){
        var pid = req.params.id;
        var success = api.deletePost(pid);
        res.send(success);
    })
}