module.exports = function(app, model){
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var api = model;
    var auth = authenticated;
    var isAdmin = isAdmin;
    app.post("/api/assignment/login", passport.authenticate('assignment'), Login);
    app.get("/api/assignment/user", auth, findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/loggedin", Loggedin);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.post("/api/assignment/logout", Logout);
    app.post('/api/assignment/register', register);

    app.post("/api/assignment/admin/user", isAdmin, createUser);
    app.get("/api/assignment/admin/user", isAdmin, findAllUser);
    app.get("/api/assignment/admin/user/:id", isAdmin, findUserById);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUser);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUser);

    passport.use('assignment', new LocalStrategy(local));
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
        if(user.firstName){
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
    }

    function register(req, res){
        var user = req.body;
        user.roles = ['student']
        api.findUserByUsername(user.username)
            .then(
                function(doc){
                    if(doc){
                        res.send(null);
                    }else{
                       return api.Create(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(doc){
                    req.login(doc, function(err){
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(doc);
                        }
                    });
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function Logout(req,res){
        req.logOut();
        req.session.destroy();
        res.send(200);
    }
    function Loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user:'0');
    }

    function Login(req, res){
        var user = req.user;
        res.json(user);
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
        }
    }

    function findAllUser(req, res){
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

        if(newuser.emails.length == 0){
            delete newuser.emails;
        }
        if(newuser.phones.length == 0){
            delete newuser.phones;
        }
        if(typeof newuser.emails == 'string'){
            newuser.emails = newuser.emails.split(',');
        }
        if(typeof newuser.phones == 'string'){
            newuser.phones = newuser.phones.split(',');
        }
        if(typeof newuser.roles == 'string'){
            newuser.roles = newuser.roles.split(',');
        }
        api.Update(userId, newuser)
            .then(
                function(stat){
                    return api.FindAll();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
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
                        return api.FindAll();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    }
    function createUser(req, res){
        var new_user = req.body;
        if(!new_user.roles){
            new_user.roles = ['student'];
        }
        if(typeof new_user.roles == 'String'){
            new_user.roles = new_user.roles.split(',');
        }
        api.findUserByUsername(new_user.username)
            .then(
                function(doc){
                    if(doc){
                        return api.FindAll();
                    }else{
                        return api.Create(new_user)
                            .then(
                                function(user){
                                    return api.FindAll();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function authenticated(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        }else{
            next();
        }
    }

    function isAdmin(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.send(403);
        }
    }
}