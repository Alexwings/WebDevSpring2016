/**
 * Created by Alex on 3/14/2016.
 */
module.exports = function(app, db, mongoose){

    var user_model = require("./models/user.model.server.js");
    var form_model = require("./models/form.model.server.js");
	var pro_userAPI = require("../../project/server/models/user.model.js")(mongoose);
    var user_service = require("./services/user.service.server.js");
    var form_service = require("./services/form.service.server.js");
    var field_service = require("./services/field.service.server.js");
	
	var userAPI = user_model(mongoose);
	var formAPI = form_model(mongoose);
	user_service(app, userAPI, db);
	form_service(app, formAPI);
    field_service(app, formAPI);
}