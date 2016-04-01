var q = require('q');

module.exports = function(FormModel){
    var Form = FormModel.getMongooseModel();

    var api = {
        'createField': createField,
        'findFieldsForForm': findFieldsForForm,
        'findField': findField,
        'updateField': updateField,
        'removeField': removeField,
        'sortField': sortField
    }
    return api;

    function sortField(formId, startIndex, endIndex){
        return Form.findById(formId).then(function(form){
            form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
            form.markModified('fields');
            form.save();
        });
    }

    function removeField(formId, fieldId){
        return Form.findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
            });
    }

    function updateField(formId, fieldObj){
        return Form.findById(formId)
            .then(
                function(form){
                    var field = form.fields.id(fieldObj._id);
                    var type = field.type;
                    field.label = fieldObj.label;
                    if(type in ['TEXT','TEXTAREA','EMAIL','PASSWORD']){
                        field.placeholder = fieldObj.placeholder;
                    }
                    if(type in ['OPTIONS','CHECKBOXES','RADIOS']){
                        field.options = fieldObj.options;
                    }
                    return form.save();
                }
            )
    }

    function findField(formId, fieldId){
        return Form.findById(formId)
            .then(function(form){
                return form.fields.id(fieldId);
        });
    }

    function findFieldsForForm(formId){
        return Form.findById(formId).select("fields");
    }

    function createField(formId, field){
        return Form.findById(formId)
            .then(function(form){
                form.fields.push(field);
                return form.save();
            });
    }
}