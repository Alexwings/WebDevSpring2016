module.exports = function(app, FormModel){
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function deleteForm(req, res){
        var formId = req.params.formId;
        FormModel
            .deleteForm(formId)
            .then(
            function(stat){
                res.send(200);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function updateForm(req, res){
        var formId = req.params.formId;
        var new_form = req.body;
        FormModel
            .updateForm(formId, new_form)
            .then(
                function(stat){
                  res.send(200);
                },
                function (err){
                    res.status(400).send(err);
                }
            );

    }

    function findFormById(req, res){
        var formId = req.params.formId;
        FormModel.findFormById(formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findFormsByUserId(req, res){
        var userId = req.params.userId;
        FormModel.findFormByUserId(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
        );
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var new_form = req.body;
        new_form.userId = userId;
        FormModel.createForm(new_form)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}