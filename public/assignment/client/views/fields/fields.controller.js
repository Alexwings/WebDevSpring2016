/**
 * Created by Alex on 2/16/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $routeParams, FieldService){
        $scope.fields = [];
        $scope.template = [
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]},
            {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]},
            {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]}
        ];
        var formId = $routeParams.formId;
        var userId = $routeParams.userId;
        FieldService.getFieldsForForm(formId).then(received, rejected);
       /* FieldService.getTemplate().then(function(data){
            $scope.template = data;
        },rejected);*/
        $scope.addField = addField;
        $scope.removeField = deleteField;
        $scope.chooseType = chooseType;
        function addField(field){
            FieldService.createFieldForForm(formId,field).then(received, rejected);
        }
        function deleteField(field){
            FieldService.deleteFieldFromForm(formId,field._id).then(received,rejected);
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

        function received(data){
            $scope.fields = data;
        }
        function rejected(data){
            alert("Action failed!");
        }
    }
})();
