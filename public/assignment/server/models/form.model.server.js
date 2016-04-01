/**
 * Created by Alex on 3/14/2016.
 */
var q = require('q');
module.exports = function(mongoose){
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model('form', FormSchema);
    var api = {
        createForm: createForm,
        findFormsForUser: findFormsForUser,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        getMongooseModel: getMongooseModel
    }
    return api;

    function getMongooseModel(){
        return FormModel;
    }

    function deleteForm(formId){

    }

    function updateForm(formId, form){

    }

    function findFormById(formId){

    }

    function findFormsForUser(userId){

    }

    function createForm(form){

    }
}