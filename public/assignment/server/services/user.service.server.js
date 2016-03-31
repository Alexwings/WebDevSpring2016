module.exports = function(app, model, db){
    var api = model;
    app.post("/api/assignment/login", Login);
    app.post("/api/assignment/user", CreateUser);
    app.get("/api/assignment/loggedin", Loggedin);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout", Logout);

    function Logout(req, res){
        req.session.destroy();
        res.send(200);
    }
    function Login(req, res){
        var credentials = req.body;
        var user = api.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }
    function Loggedin(req, res){
        res.json(req.session.currentUser);
    }
    function CreateUser(req, res){
        var user = req.body;
        var usr = api.Create(user);
        req.session.currentUser = usr;
        res.json(usr);
    }
    function findUser(req, res){
        if(req.query.username){
            var usr = api.findUserByUsername(req.query.username);
            res.json(usr);
        }else{
            var users = api.FindAll();
            res.json(users);
        }
    }
    function findUserById(req, res){
        var userId = req.params.id;
        var user = api.FindById(userId);
        res.json(user);
    };
    function updateUser(req, res){
        var userId = req.params.id;
        var newuser = req.body;
        var user = api.Update(userId, newuser);
        req.session.currentUser = user;
        res.json(user);
    }
    function deleteUser(req, res){
        var userId = req.params.id;
        var users = api.Delete(userId);
        res.json(users);
    }
}