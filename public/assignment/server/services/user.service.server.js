module.exports = function(app, model, db){
    var api = model;
    app.post("/api/assignment/login", Login);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    //app.post("/api/assignment/logout", Logout);

    function Login(req, res){
        var credentials = req.body;
        api.findUserByCredentials(credentials)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function register(req, res){
        var user = req.body;
        api.Create(user)
            .then(
                function(doc){
                res.json(doc);
                },
                function(err){
                res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        if (req.query.username) {
            api.findUserByUsername(req.query.username)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            var users = api.FindAll()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res){
        var userId = req.params.id;
        api.FindById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var newuser = req.body;
        api.Update(userId, newuser)
            .then(
                function(stat){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        var userId = req.params.id;
        api.Delete(userId)
            .then(
                function(doc){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}