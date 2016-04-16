/**
 * Created by Alex on 3/24/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("HomeController", HomeController);
    function HomeController($location){
        var model = this;
        model.setType = setType;
        model.search = search;
        function init(){
            model.req = {};
        }
        init();
        function setType(type){
            model.req.type = type;
        }
        function search(req){
            if(req.type){
                $location.path("/result/"+req.name+"/type/"+req.type);
            }else {
                $location.path("/result/"+req.name+"/type/"+"movie");
            }
        }
    }
})()