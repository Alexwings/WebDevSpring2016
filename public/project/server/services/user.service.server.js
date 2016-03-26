module.exports = function(app, API, db){
    var api = API;
    app.get("/api/project/user/username/:username/password/:password", function (req, res){
        var usrname = req.params.username;
        var pwd = req.params.password;
        var credentials = {username: usrname, password: pwd};
        var usr = api.findUserByCredentials(credentials);
        res.send(usr);
        });
    app.get("/api/project/user/username/:username", function(req, res){
        var usrname = req.username;
        var usr = api.findUserByUsername(req.query.username);
        res.send(usr);
    });
    app.post("/api/project/user", function(req, res){
        var user = req.body;
        var usr = api.Create(user);
        res.send(usr);
    });
    app.get("/api/project/user", function(req, res){
        var users = api.FindAll();
        res.send(users);
    });
    app.get("/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        var user = api.FindById(userId);
        res.send(user);
    });
    app.put("/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        var newuser = req.body;
        var user = api.Update(userId, newuser);
        res.send(user);
    });
    app.delete("/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        var users = api.Delete(userId);
        res.send(users);
    });
};