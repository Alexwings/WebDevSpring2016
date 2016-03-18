/**
 * Created by Alex on 3/2/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    function FormService($http, $q){
        var service={
            "createFormForUser": createFormForUser,
            "findAllFormsForUser": findAllFormsForUser,
            "deleteFormById": deleteFormById,
            "updateFormById": updateFormById
        };
        return service;
        //implementation of all event handler
        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/" + userId + "/form", form)
                .then(renderSuccess, renderError);
        };
        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/" + userId + "/form")
                .then(renderSuccess, renderError);
        };
        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        };
        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
        function renderSuccess(response){
            var data = response.data;
            if(data){
                return data;
            }else {
                $q.reject(data);
            }
        }
        function renderError(response){
            $q.reject(response.data);
        }
    }
})()
