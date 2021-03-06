// helloWorld.js
(function(){

    // add a js called hello-world
    // to a module called HelloWorldDirective
    angular
        .module("HelloWorldDirective")
        .directive("helloWorld", HelloWorld);

    // implement the js in the following function
    function HelloWorld() {

        // configure the template attribute
        // to be the static "Hello World" string
        // the hello-world element will contain
        // the static string "Hello World"
        return {
            template: "Hello World"
        };
    }
})();