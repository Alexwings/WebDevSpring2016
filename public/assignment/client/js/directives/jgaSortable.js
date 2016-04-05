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

                    scope.jgaSortableCallback({start:start, end:end});

                }

            });
        }
        return {
            scope:{
                jgaSortableCallback: '&'
            },
            link: link
        }
    }
})();