var app = angular.module('editor', []);

app.controller('editorCtrl', function($scope) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";

  $scope.level = {
    //World Base
    name: "",
    gravity: {
      x:100,
      y:100
    },
    friction: 0.5,
    //stiffness(1e5),
    impactEvent: true,
    platforms: 
      [{
        type: "default",
        id: 0,
        x: 0,
        y: 0,
        height: 0,
        width: 0
      }],
    ais: 
      [{
        type: "default",
        id: 0,
        x: 0,
        y: 0,
        height: 0,
        width: 0
      }],
    special: 
      [{
        type: "default",
        id: 0,
        x: 0,
        y: 0,
        height: 10,
        width: 0
      }]
  };

});
