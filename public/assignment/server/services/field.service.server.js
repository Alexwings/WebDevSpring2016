module.exports = function(app, model, db){
    var api = model;
    app.get("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.params.formId;
        var form = api.FindById(formId);
        res.send(form.fields);
    })
    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = api.findFieldById(formId, fieldId);
        res.send(field);
    })
    app.get("/api/assignment/field/template", function(req, res){
        var temp = api.fieldTemplate();
        res.send(temp);
    })
    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var fId = req.params.formId;
        var fieId = req.params.fieldId;
        var fs = api.removeField(fId, fieId);
        res.send(fs);
    })
    app.post("/api/assignment/form/:formId/field", function(req,res){
        var formId = req.params.formId;
        var field =  req.body;
        var form = api.addField(formId, field);
        res.send(form);
    })
    app.put("/api/assignment/form/:formId/field/:fieldId", function(res, req){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var form = api.updateField(formId, fieldId, field);
        res.send(form);
    })
}