/**
 * Created by Alex on 3/2/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    function FromService($rootScope){
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];
        var service={"createFormForUser": createFormForUser,
        "findAllFormsForUser": findAllFormsForUser,
        "deleteFormById": deleteFormById,
        "updateFormById": updateFormById
        };
        return service;
        //implementation of all event handler
        function createFormForUser(userId, form, callback){
            form._id = produceId(new Date());
            form.userId = userId;
            forms.push(form);
            callback(form);
        };
        //helper function to produce unique ID
        function produceId(date){
            return date.now().toString();
        }
        function findAllFormsForUser(userId, callback){
            var result_forms = [];
            for(var i = 0; i < forms.length; i++){
                var form = forms[i];
                if(form.userId == userId) {
                    result_forms.push(form);
                }
            }
            callback(result_forms);
        };
        function deleteFormById(formId, callback){
            for(var i = 0; i< forms.length; i++){
                if(forms[i]._id == formId){
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        };
        function updateFormById(formId, newForm, callback){
            for(var i = 0; i < forms.length; i++){
                var form = forms[i];
                if(form._id == formId){
                    form._id = formId;
                    form.title = newForm.title;
                    form.userId = newForm.userId;
                    callback(form);
                    break;
                }
            }
        }
    }
})()
