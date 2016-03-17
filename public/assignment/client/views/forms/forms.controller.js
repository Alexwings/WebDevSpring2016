/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($scope, $location, FormService, UserService){
        var formsOfUser;
        var curUser = UserService.getCurrentUser();
        var findAllFormCallback = function(forms){
            formsOfUser = forms;
        }
        FormService.findAllFormsForUser(curUser._id,findAllFormCallback);
        $scope.show_form = show_form;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.form_collection = formsOfUser;
        function show_form(title){
            if(title){
                return title;
            }else return "no form selected"
        }
        function addForm(form){
            var userId = curUser._id;
            var callback = callback;
            var formExist = false;
            function callback(form){
                formsOfUser.unshift(form);
            }
            for(var i = 0; i<formsOfUser.length; i++){
                 f = formsOfUser[i];
                if(f.title == form.title) {
                    formExist = true;
                    break;
                }
            }
            if(!formExist){
                FormService.createFormForUser(userId, form, callback);
            }
        }
        function updateForm(form){
            var formId = form._id;
            var callback = callback;
            FormService.updateFormById(formId,form,callback);
            function callback(new_form){
                $scope.selected = null;
            }
        }
        function deleteForm(index){
            var form = formsOfUser[index];
            var callback = callback;
            var success = false;
            FormService.deleteFormById(form._id, callback);
            function callback(fs){
                $scope.selected = null;
                success = true;
            }
            if (success){
                formsOfUser.splice(index, 1);
            }
        }
        function selectForm(index){
            $scope.selectedIndex = index;
            var form = formsOfUser[index];
            $scope.selected = { _id:form._id, title:form.title, userId: form.userId }
        }
    }
})()