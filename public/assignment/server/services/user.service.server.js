module.exports = function(app, model, db){
    var api = model;

    app.use("/api/assignment/user", function (req, res, next){
        if(req.query.username && req.query.password){
            var credentials = {username: req.query.username, password: req.query.password};
            var usr = api.findUserByCredentials(credentials);
            res.send(usr);
        }else if(req.query.username){
            var usr = api.findUserByUsername(req.query.username);
            res.json(usr);
        }else{
            next();
        }
    });
    app.post("/api/assignment/user", function(req, res){
        var user = req.body;
        var usr = api.Create(user);
        res.json(usr);
    });
    app.get("/api/assignment/user", function(req, res){
        var users = api.FindAll();
        res.json(users);
    })
    app.get("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        var user = api.FindById(userId);
        res.json(user);
    })
    app.put("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        var newuser = req.body;
        var user = api.Update(userId, newuser);
        res.json(user);
    })
    app.delete("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        var users = api.Delete(userId);
        res.json(users);
    })
}