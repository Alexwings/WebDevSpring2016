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
            "findFormById": findFormById,
            "deleteFormById": deleteFormById,
            "updateFormById": updateFormById
        };
        return service;
        //implementation of all event handler
        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        };
        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/" + userId + "/form");
        };
        function findFormById(formId){
            return $http.get("/api/assignment/form/"+formId);
        }
        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        };
        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
    }
})()
