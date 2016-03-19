// jgaTable.js
(function(){

    // declares js in
    // custom module
    angular
        .module("jgaTable", [])             // declares custom module
        .directive("jgaTable", jgaTable);   // declares js

    // function jgaTable() implements the js
    function jgaTable() {
        return {
            // scope binds attribute variables
            // to local bound variables
            scope: {
                "caption": "=caption",  // local caption variable binds to caption attribute
                "border": "=",          // if local and attributes are same, use '='
                "data": "="             // data binds to users array
            },
            // templateUrl refers to template file
            // template file iterates over users array
            // renders each user in a row
            templateUrl: "jgaTable.html"
        };
    }
})();