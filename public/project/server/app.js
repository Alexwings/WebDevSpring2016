module.exports = function(app){
    var db = null;
    var postAPI = require("./models/posts.model.js")(app, db);
    var userAPI = require("./models/user.model.js")(app, db);
    var commentAPI = require("./models/comments.model.js")(app, db);

    require("./services/comments.service.server.js")(app, commentAPI, db);
    require("./services/posts.service.server.js")(app, postAPI, db);
    require("./services/user.service.server.js")(app, userAPI, db);
}