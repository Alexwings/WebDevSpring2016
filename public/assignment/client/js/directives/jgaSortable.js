(function(){
    angular
        .module("FormBuilderApp")
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            $(element).sortable({
                axis: 'Y',
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.sortField(start, end);
                    /*var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();*/
                }

            });
        }
        return {
            link: link
        }
    }
})();