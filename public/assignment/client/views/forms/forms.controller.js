/**
 * Created by Alex on 2/16/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($scope, $location, FormService, UserService){
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var curUserId = null;
        function init(){
            curUserId = UserService.getCurrentUser()._id;
            FormService.findAllFormsForUser(curUserId)
                .then(
                    function(res){
                        var docs = res.data;
                        console.log(docs);
                        $scope.form_list = docs;
                    },
                    function(res){
                        console.log(res.data);
                        alert("An Error occur when fetching forms from database!");
                    }
                )
        }
        init();
        function addForm(form){
            FormService.createFormForUser(curUserId, form)
                .then(
                    function(res){
                        init();
                    },
                    function(res){
                        console.log(res.data);
                        alert("An Error occur when creating new forms!");
                    }
                );
        }
        function updateForm(form){
            FormService.updateFormById(form._id, form)
                .then(
                    function(res){
                        $location.path("/user/"+curUserId+"/form/"+form._id+"/field");
                    },
                    function(res){
                        console.log(res.data);
                        alert("Failed to update the form!");
                    }
                );
        }
        function deleteForm(index){
            var form = $scope.form_list[index];
            var formId = form._id;
            FormService.deleteFormById(formId)
                .then(
                    function(res){
                        init();
                        $scope.selected = null;
                    },
                    function(res){
                        console.log(res.data);
                        alert("An Error occur when deleting from database!");
                    }
                );
        }
        function selectForm(index){
            $scope.selectedIndex = index;
            $scope.selected ={
                _id:$scope.form_list[index]._id,
                title: $scope.form_list[index].title,
            };
        }
    }
})()