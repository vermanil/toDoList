/**
 * Created by vermanil on 2/28/17.
 */

var app = angular.module('toDo', []);;
app.controller('todoCtrl', function ($scope, $http) {
    var l = 0;
    $http({
        method : "GET",
        url : '/todo'
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data.todo;
        l = $scope.myWelcome.length;
        $scope.toDoList = [{todoText:$scope.myWelcome[l], done:false}];
        for (i = 1;i<l;i++) {
            $scope.toDoList.push({todoText:$scope.myWelcome[i], done:false});
        }
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
    console.log($scope.myWelcome);
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