/**
 * Created by Alex on 3/14/2016.
 */
module.exports = function(app){
    var db = null;
    var user_model = require("./models/user.model.js")(app, db);
    var form_model = require("./models/form.model.js")(app, db);
    var user_service = require("./services/user.service.server.js")(app,user_model, db);
    var form_service = require("./services/form.service.server.js")(app,form_model, db);
    var field_service = require("./services/field.service.server.js")(app,form_model, db);
}