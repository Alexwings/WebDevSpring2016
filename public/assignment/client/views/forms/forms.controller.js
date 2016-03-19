/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($scope, $location, FormService, UserService){
        var curUser = UserService.getCurrentUser();
        FormService.findAllFormsForUser(curUser._id).then(received, rejected);
        $scope.form_list = [];
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        function addForm(form){
            FormService.createFormForUser(curUser._id, form)
                .then(function(){
                    FormService.findAllFormsForUser(curUser._id).then(received, rejected);
                });
        }
        function updateForm(form){
            FormService.updateFormById(form._id, form)
                .then(function(data){
                    $location.path("/user/"+curUser._id+"/form/"+form._id+"/field");
                });
        }
        function deleteForm(index){
            var form = $scope.form_list[index];
            var formId = form._id;
            FormService.deleteFormById(formId)
                .then(function(){
                    FormService.findAllFormsForUser(curUser._id).then(received, rejected);
                });
        }
        function selectForm(index){
            $scope.selectedIndex = index;
            $scope.selected ={
                _id:$scope.form_list[index]._id,
                title: $scope.form_list[index].title,
                userId: $scope.form_list[index].userId,
                field: $scope.form_list[index].field
            };
        }
        function received(data){
            $scope.form_list = data;
        }
        function rejected(){
            alert("Action failed!");
        }
    }
})()