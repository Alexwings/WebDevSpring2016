module.exports = function(app, API, db){
    var api = API;
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;

    var auth = authenticated;
    var isAdmin = isAdmin;
    //user login
    app.post('/api/project/login', passport.authenticate('project'), Login);
    app.post('/api/project/register', register);
    app.post('/api/project/logout', Logout);
    app.get('/api/project/loggedin', Loggedin);
    //user update
    app.put('/api/project/user/:id', updateUser);
    app.get("/api/project/user/username/:username", findByUserName);
    app.get("/api/project/user/:id", findById);
    //admin
    app.get("/api/project/admin/:id", findById);
    app.delete('/api/project/admin/:id', isAdmin, deleteUser);
    app.get('/api/project/admin', isAdmin, findAll);
    app.post('/api/project/admin', createUser);
    app.put('/api/project/admin/:id', updateUser);

    function authenticated(req, res, next){
        if(!req.user.isAuthenticated()){
            res.send(401);
        }else{
            next();
        }
    }

    function isAdmin(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.role === 'admin'){
                next();
            }else{
                res.send(403);
            }
        }else{
            res.send(403);
        }
    }

    function createUser(req, res){
        var new_user = req.body;
        api.findUserByUsername(new_user.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    }else{
                        return api.Create(new_user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                })
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

    function findAll(req, res){
        api.FindAll()
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
    function deleteUser(req, res){
        var id = req.params.id;
        api.Delete(id)
            .then(
                function(stat){
                    if(stat){
                        return api.FindAll();
                    }
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findById(req, res){
        var id = req.params.id;
        api.FindById(id)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    }else{
                        res.json(null);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
    function findByUserName(req, res){
        var username = req.params.username;
        api.findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var id = req.params.id;
        var user = req.body;
        api.Update(id, user)
            .then(
                function(stat){
                    return api.FindAll();
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function Loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function Logout(req, res){
        req.logout();
        req.session.destroy();
        res.send(200);
    }
    function register(req, res){
        var new_user = req.body;
        api.findUserByUsername(new_user.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    }else{
                        return api.Create(new_user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(doc){
                    if(doc){
                        req.login(doc, function(err){
                            if(err){
                                res.status(400).send(err);
                            }else {
                                res.json(doc);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function Login(req, res){
        var user = req.user;
        res.json(user);
    }

    passport.use('project', new localStrategy(local));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done) {
        api.FindById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(null, err);
                }
            );
    }
    function local(username, password, done){
        api.findUserByCredentials({username: username, password: password})
            .then(
                function(user){
                    if(!user){return done(null, false);}
                    else{return done(null, user);}
                },
                function(err){
                    return done(null, err);
                }
            );
    }
};