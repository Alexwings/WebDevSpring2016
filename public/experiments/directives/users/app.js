// app.js
(function() {

    // declare DirectiveUserExperiment module
    angular
        .module("DirectiveUserExperiment", [
            "escapeHtml",       // depends on escapeHtml js
            "getServerFile",    // depends on getServerFile js
            "jgaTable"          // depends on jgaTable js
        ])
        .controller("DataController", dataController);

    // create a controller that will provide user data to view
    function dataController($scope) {

        // declare user array containing user object instances
        var users = [
            {first: "Alice", last: "Wonderland", email: "alice@email.com"},
            {first: "Bob", last: "Hope", email: "bob@oscars.com"},
            {first: "Charlie", last: "Brown", email: "charlie@schultz.com"}
        ];

        // bind user array to view
        // view can refer to array using 'users' variable
        $scope.users = users;
    }

})();