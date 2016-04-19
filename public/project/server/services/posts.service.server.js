module.exports = function(app, API){
    var api = API;
    app.post("/api/project/post", Create);
    app.get("/api/project/post/:id", findById);
    app.post("/api/project/post/title", findByTitle);
    app.post("/api/project/post/title/:title", findPostByTitle);
    app.put("/api/project/post/:id", Update);
    app.delete("/api/project/post/:id", Delete);

    //CreatePosts
    function Create(req, res){
        var post = req.body;
        api.findPostByTitle(post.Title)
            .then(
                function(p){
                    if(p){
                        console.log("Found post");
                        res.send(null);
                    }else{
                        return api.CreatePosts(post);
                    }
                },
                function(err){
                    console.log("find Title err");
                    res.status(400).send(err);
                }
            )
            .then(
                function(p){
                    console.log("create post");
                    res.json(p);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //findPostById
    function findById(req, res){
        var pid = req.params.id;
        api.findPostById(pid)
            .then(
                function(p){
                    res.json(p);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //findPostsByTitle
    function findByTitle(req, res){
        var keys = req.body;
        api.findPostsByTitle(keys.Title, keys.Type)
            .then(
                function (ps) {
                    if(ps){
                        res.json(ps);
                    }else{
                        res.send(null);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function findPostByTitle(req, res){
        var t = req.params.title;
        api.findPostByTitle(t)
            .then(
                function(p){
                    if(p){
                        res.json(p);
                    }else{
                        res.send(null);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
    //updatePost
    function Update(req, res){
        var id = req.params.id;
        var post = req.body;
        api.updatePost(id, post)
            .then(
                function(stat){
                    return api.findById(id);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(p){
                    res.json(p);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //deletePost
    function Delete(req, res){
        var pid = req.params.id;
        api.deletePost(pid)
            .then(
                function(stat){
                    res.send(stat);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}