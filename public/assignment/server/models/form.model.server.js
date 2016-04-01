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
        return FormModel.remove().where('_id').equals(formId);
    }

    function updateForm(formId, form){
        var defer = q.defer();
        FormModel.update(
            {'_id': formId},
            {$set: form},
            function(err, stat){
                if(!err){
                    defer.resolve(stat);
                }else{
                    defer.reject(err);
                }
            }
        );
        return defer.promise;
    }

    function findFormById(formId){
        return FormModel.findById(formId);
    }

    function findFormsForUser(userId){
        var defer = q.defer();
        FormModel.find(
            {userId: userId},
            function(err, doc){
                if(!err){
                    defer.resolve(doc);
                }else {
                    defer.reject(err);
                }
            }
        );
        return defer.promise;
    }

    function createForm(form){
        var defer = q.defer();
        FormModel.create(form,
            function(err, doc){
                if(!err){
                    defer.resolve(doc);
                }else{
                    defer.reject(err);
                }
            });
        return defer.promise;
    }
}