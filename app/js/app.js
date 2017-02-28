var app = angular.module('progressBarApp', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "views/barList.html",
            controller: "HomeController"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service("PBService", function($http){

    var pbService = {};
    var limit = 200;

    pbService.barItems = [];

    $http.get("data/server_data.json")
        .success(function(data){
            pbService.barItems = data;
        })
        .error(function(data,status){
            alert("Things went wrong!");
        });

    return pbService;

});

app.controller("HomeController", ["$scope", "PBService", function($scope, PBService) {
    $scope.barItems = PBService.barItems;
    $scope.limit = PBService.limit;
    that = $scope;

    setLimit = function () {
        if ($scope.limit > 100)
            $scope.limit=100;
    }

    upValue = function (curValue) {
        var curValue = curValue + 5
        if (curValue > 100 )
            curValue = 100;
    }

    downValue = function (curValue) {
        var curValue = curValue - 5
        if (curValue < 0 )
            curValue = 0;
    }



}]);


app.directive("tbProgressItem", function(){
    return{
        restrict: "E",
        templateUrl: "views/barItem.html"
    }
});