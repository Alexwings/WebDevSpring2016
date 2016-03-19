(function (){
    angular
        .module("myDialogApp")
        .directive("myDialog", myDialog);
    function myDialog($parse){
        return {
            restrict: E,
            linke: function(elem, attr){

            }
        }
    }
})