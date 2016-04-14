module.exports = function(app, API, db){
    var api = API;
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;
    passport.use('project', new localStrategy(local));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    //user login
    app.post('/api/project/login', passport.authenticate('project'), Login);
    app.post('/api/project/register', register);

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
    function local(username, password, done){
        api.findUserByCredentials({username: username, password: password})
            .then(
                function(user){
                    if(!user) return done(null, false);
                    else return done(null, user);
                },
                function(err){
                    return done(null, err);
                }
            );
    }
};