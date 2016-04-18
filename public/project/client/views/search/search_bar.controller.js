/**
 * Created by Alex on 3/25/2016.
 */
(function(){
    angular
        .module("OnlineMovieApp")
        .controller("BarController", BarController);
    function BarController($location){
        var model = this;
        model.search = search;
        function init(){ model.req = {}};
        init();
        function search(req){
            if(req.type && req.type !== "Group By"){
                $location.path("/result/"+req.name+"/type/"+req.type);
            }else {
                $location.path("/result/"+req.name+"/type/"+"movie");
            }
        }
    }
})()