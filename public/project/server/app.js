module.exports = function(app, db, mongoose){
    var userAPI = require("./models/user.model.js")(mongoose);
    var postAPI = require("./models/posts.model.js")(mongoose);
    require("./services/user.service.server.js")(app, userAPI);
    require("./services/posts.service.server.js")(app, postAPI);
    //=======================================================
    var commentAPI = require("./models/comments.model.js")(app);
    require("./services/comments.service.server.js")(app, commentAPI);
};