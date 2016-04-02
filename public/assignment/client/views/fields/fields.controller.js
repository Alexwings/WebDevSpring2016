/**
 * Created by Alex on 2/16/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)
        .controller("EditFieldController", EditFieldController);
    function FieldController($scope, $routeParams, $location, FieldService){
        var formId = null;
        var userId = null;
        $scope.addField = addField;
        $scope.removeField = deleteField;
        $scope.sendToPopUp = sendToPopUp;
        $scope.sortField = sortField;
        function init(){
            formId = $routeParams.formId;
            userId = $routeParams.userId;
            FieldService.getFieldsForForm(formId)
                .then(
                    function(res){
                        console.log(res.data);
                        if(res.data.length != 0){
                            $scope.fields = res.data;
                        }
                    },
                    function(res){
                        console.log(res.data);
                        alert("An error occured when fetching fields from database!");
                    }
                );
        }
        init();
        function sortField(startIndex, endIndex){
            FieldService.sortFields(formId, startIndex, endIndex)
                .then(
                    function(res){
                        init();
                    },
                    function(res){
                        console.log(res.status);
                    }
                );
        }
        function addField(model){
            var type = null;
            switch(model){
                case('single-line-text'):
                    type = 'TEXT';
                    break;
                case('multi-line-text'):
                    type = 'TEXTAREA';
                    break;
                case('dropdown'):
                    type = 'OPTIONS';
                    break;
                case('radios'):
                    type = 'RADIOS';
                    break;
                case('checkbox'):
                    type = 'CHECKBOXES';
                    break;
                case('date'):
                    type = 'DATE';
                    break;
            }
            var field = {type: type}
            FieldService.createFieldForForm(formId, field)
                .then(
                    function(res){
                        $scope.fields = res.data.fields;
                    },
                    function(res){
                        console.log(res.data);
                        alert("An error occured when creating the field!")
                    }
                );
        }
        function deleteField(field){
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(
                    function(res){
                        init();
                    },
                    function(res){
                        console.log(res.data);
                        alert("An error occured when deleting field from form!");
                    }
                );
        };

        function sendToPopUp(field){
            $location.url('/user/'+userId+'/form/'+formId+'/field/'+field._id);
        }
    }

    function EditFieldController($scope, $routeParams, $location, FieldService){
        var formId = null;
        var fieldId = null;
        var userId = null;
        $scope.updateField = updateField;
        $scope.cancel = cancel;
        function init(){
            formId = $routeParams.formId;
            userId = $routeParams.userId;
            fieldId = $routeParams.fieldId;
            FieldService.getFieldForForm(formId, fieldId)
                .then(
                    function(res){
                        $scope.model = res.data;
                    },
                    function(res){
                        console.log(res);
                        alert("An Error occured when fetching the field");
                    }
                );
        }
        init();
        function updateField(model){
            var options = [];
            if(model.choise){
                var chs = model.choise.split('\n');
                for(var i = 0; i < chs.length; i++){
                    var pair = chs[i].split(':');
                    options.push({label:pair[0], value:pair[1]});
                }
            }
            var field = {label: model.label, type: model.type, placeholder: model.placeholder, options: options}
            FieldService.updateField(formId, fieldId, field)
                .then(
                    function(res){
                        $location.url('/user/'+userId+'/form/'+formId+'/field');
                    },
                    function(res){
                        alert("Failed to update the field!");
                    }
                );
        }
        function cancel(){
            $location.url('/user/'+userId+'/form/'+formId+'/field');
        }
    }
})();
