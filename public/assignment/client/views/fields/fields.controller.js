/**
 * Created by Alex on 2/16/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $routeParams, FieldService){
        var formId = $routeParams.formId;
        var userId = $routeParams.userId;
        function init(){
            FieldService.getFieldsForForm(formId).then(received, rejected);
            FieldService.getTemplate().then(function(response){
                $scope.template = response.data;
            }, rejected);
        }
        init();
        $scope.addField = addField;
        $scope.removeField = deleteField;
        $scope.chooseType = chooseType;
        function addField(field){
            FieldService.createFieldForForm(formId, field).then(received, rejected);
        }
        function deleteField(field){
            FieldService.deleteFieldFromForm(formId, field._id).then(received,rejected);
        }
        function chooseType(key){
            var types = {TEXT:"#singleText",
                TEXTAREA:"#multiText",
                OPTIONS:"#dropdown",
                CHECKBOX:"#check",
                RADIOS:"#radio",
                DATE:"#date"};
            return types[key];
        }

        function received(response){
            if(response.data){
                $scope.fields = response.data;
            }else{
                alert("This form does not have the request field!");
            }
        }
        function rejected(response){
            alert("Action failed!");
        }
    }
})();
