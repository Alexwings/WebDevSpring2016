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

    }

    function removeField(formId, FieldId){

    }

    function updateField(formId, fieldId){

    }

    function findField(formId, fieldId){

    }

    function findFieldsForForm(formId){

    }

    function createField(formId, field){

    }
}