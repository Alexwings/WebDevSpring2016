/**
 * Created by Alex on 3/14/2016.
 */
module.exports = function(app){
    var db = null;
    var user_model = require("./models/user.model.js");
    var form_model = require("./models/form.model.js");
	
    var user_service = require("./services/user.service.server.js");
    var form_service = require("./services/form.service.server.js");
    var field_service = require("./services/field.service.server.js");
	
	var userAPI = user_model(app, db);
	var formAPI = form_model(app, db);
	user_service(app, userAPI, db);
	form_service(app, formAPI, db);
}