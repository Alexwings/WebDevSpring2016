module.exports = function(app, model, db){
    var api = model;
    app.get("/api/assignment/user/:userId/form", function(req, res){
        var usrId = req.params.userId;
        var fs = api.findFormsByUserId(usrId);
        res.json(fs);
    })
    app.get("/api/assignment/form/:formId", function(req, res){
        var id = req.params.formId;
        var form = api.FindById(id);
        res.json(form);
    })
    app.delete("/api/assignment/form/:formId", function(req,res){
        var id = req.params.formId;
        var fs = api.Delete(id);
        res.json(fs);
    })
    app.post("/api/assignment/user/:userId/form", function(req, res){
        var id = req.params.userId;
        var form = req.body;
        form.userId = id;
        var fs = api.Create(form);
        res.json(fs);
    })
    app.put("/api/assignment/form/:formId", function(req, res){
        var id = req.params.formId;
        var body = req.body;
        var fs = api.Update(id, body);
        res.json(fs);
    })
}