// jgaTable.js
(function(){

    // declares js in
    // custom module
    angular
        .module("jgaTable", [])
        .directive("jgaTable", jgaTable);

    // implements js
    // templateUrl refers to template file
    function jgaTable() {
        return {
            scope: {
                "caption": "=caption",
                "border": "="
            },
            templateUrl: "jgaTable.html"
        };
    }
})();