/**
 * Created by vermanil on 2/28/17.
 */
var app = angular.module('toDo', []);;
app.controller('todoCtrl', function ($scope) {
    $scope.toDoList = [{todoText:'Clean House', done:true}];
    c = $scope.toDoList;
    console.log(c.todoText);

    $scope.addTask = function() {
        console.log($scope.giveInput);
        $scope.toDoList.push({todoText:$scope.giveInput, done:false});
        $scope.giveInput = "";
    };
});