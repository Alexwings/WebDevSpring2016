/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($scope, $location, FormService, UserService){
        function init(){
            UserService.getCurrentUser().then(function(response){
                if(response.data){
                    var id = response.data._id;
                    $scope.curId = id;
                    FormService.findAllFormsForUser(id).then(received, rejected);
                }
            }, function(response){
                alert("No current user found, please login");
                $location.url("/login");
            });
        }
        init();
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(id, form){
            FormService.createFormForUser(id, form)
                .then(function(){
                    FormService.findAllFormsForUser(id).then(received, rejected);
                });
        }
        function updateForm(id, form){
            FormService.updateFormById(form._id, form)
                .then(function(data){
                    $location.path("/user/"+id+"/form/"+form._id+"/field");
                });
        }
        function deleteForm(index, id){
            var form = $scope.form_list[index];
            var formId = form._id;
            FormService.deleteFormById(formId)
                .then(function(){
                    FormService.findAllFormsForUser(id).then(received, rejected);
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
        function received(response){
            $scope.form_list = response.data;
        }
        function rejected(response){
            alert("Action failed!");
        }
    }
})()