module.exports = function(app, FormModel){
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    var FieldModel = require('./field.model.server.js')(FormModel);

    function findFieldsForForm(req, res){

    }
    function findField(req, res){

    }
    function removeField(req, res){

    }
    function createField(req, res){

    }
    function updateField(req, res){

    }
}