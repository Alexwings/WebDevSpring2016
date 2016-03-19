(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);
    function FieldService($http, $q){
        var service = {
            'createFieldForForm': createFieldForForm,
            'getFieldsForForm': getFieldsForForm,
            'getFieldForForm': getFieldForForm,
            'deleteFieldFromForm': deleteFieldFromForm,
            'updateField': updateField,
            'getTemplate': getTemplate
        }
        return service;
        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field", field)
                .then(renderSuccess, renderError);
        };
        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/" + formId + "/field")
                .then(renderSuccess, renderError);
        };
        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/"+formId+"/field/"+ fieldId)
                .then(renderSuccess, renderError);
        };
        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/"+formId+"/field/"+ fieldId)
                .then(renderSuccess, renderError);
        };
        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/"+formId+"/field/"+ fieldId, field)
                .then(renderSuccess, renderError);
        }
        function getTemplate(){
            return $http.get("/api/assignment/form/template")
                .then(renderSuccess, renderError);
        }
        function renderSuccess(response){
            if(response.data){
                return response.data;
            }else {
                $q.reject(response.data);
            }
        }
        function renderError(response){
            $q.reject(response.data);
        }

    }
})();