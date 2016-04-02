module.exports = function(app, FormModel){
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/field", sortFields);

    var FieldModel = require('../models/field.model.server.js')(FormModel);

    function sortFields(req, res){
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;
        if(startIndex && endIndex){
            FieldModel.sortField(formId, startIndex, endIndex)
                .then(
                    function(stat){
                        return FormModel.findFieldsForForm(formId);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(fields){
                        res.json(fields);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }
    }
    function findFieldsForForm(req, res){
        var formId = req.params.formId;
        FieldModel.findFieldsForForm(formId)
            .then(
                function(doc){
                    res.json(doc.fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function findField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId
        FieldModel.findField(formId,fieldId)
            .then(
                function(field){
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function removeField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldModel.removeField(formId, fieldId)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        FieldModel.createField(formId, field)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status.send(err);
                }
            );
    }
    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId
        var fieldObj = req.body;
        FieldModel.updateField(formId,fieldId, fieldObj)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}