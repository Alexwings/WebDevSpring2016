module.exports = function(app, model, db){
    var passport = require('passport')
    var LocalStrategy = require('passport-local').Strategy;
    var api = model;
    app.post("/api/assignment/login", passport.authenticate('local'), Login);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/loggedin", Loggedin);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    //app.post("/api/assignment/logout", Logout);

    passport.use(new LocalStrategy(local));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function local(username, password, done){
        api.findUserByCredentials({username:username, password: password})
            .then(
                function(user){
                    if(!user){return done(null, false);}
                    return done(null, user);
                },
                function(err){
                    if(err){return done(err); }
                }
            );
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        api.FindById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(null, err);
                }
            );
    }

    function Loggedin(req, res){
        res.send(req.isAuthenticated() ? '1' :'0');
    }

    function Login(req, res){
        var user = req.user;
        res.json(user);
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