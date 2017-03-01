/**
 * Created by vermanil on 2/28/17.
 */

var app = angular.module('toDo', []);;
app.controller('todoCtrl', function ($scope, $http) {
    $http({
        method : "GET",
        url : '/todo'
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data.todo;
        console.log(response.data.todo)
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
    console.log($scope.myWelcome)
    $scope.toDoList = [{todoText:'Clean House', done:true}];

    $scope.addTask = function() {
        //console.log($scope.giveInput);
        var req = {
            method: 'POST',
            url: '/do',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { todo: $scope.giveInput }
        }


        $http(req).then(function (){
            console.log("hello");
        }, function (){
            console.log("error");
        });


        console.log(req.data.test);
        $scope.toDoList.push({todoText:$scope.giveInput, done:false});
        $scope.giveInput = "";
    };
});