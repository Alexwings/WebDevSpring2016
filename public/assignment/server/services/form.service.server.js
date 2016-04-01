module.exports = function(app, FormModel){
    var api = FormModel;
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function deleteForm(req, res){

    }

    function updateForm(req, res){

    }

    function findFormById(req, res){

    }

    function findFormByUserId(req, res){

    }

    function createForm(req, res){

    }
}