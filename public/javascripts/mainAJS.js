var app1 = angular.module('app1',['ngMessages']);

app1.controller('test', function($scope){
  console.log("Angular is working...");
  $scope.test = "wooo";
});
