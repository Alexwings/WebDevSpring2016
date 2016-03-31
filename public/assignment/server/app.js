/**
 * Created by Alex on 3/14/2016.
 */
module.exports = function(app, db, mongoose){

    var user_model = require("./models/user.model.js");
    var form_model = require("./models/form.model.js");
	
    var user_service = require("./services/user.service.server.js");
    var form_service = require("./services/form.service.server.js");
    var field_service = require("./services/field.service.server.js");
	
	var userAPI = user_model(db, mongoose);
	var formAPI = form_model(db, mongoose);
	user_service(app, userAPI, db);
	form_service(app, formAPI, db);
    field_service(app, formAPI, db);
}