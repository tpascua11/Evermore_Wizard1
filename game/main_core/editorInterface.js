var app = angular.module('editor', []);
var config = {
  apiKey: "AIzaSyCULscWToLDhqWGLNEv08evsGa5hbo_9sM",
  authDomain: "dragons-den-ad546.firebaseapp.com",
  databaseURL: "https://dragons-den-ad546.firebaseio.com",
  storageBucket: "dragons-den-ad546.appspot.com",
  messagingSenderId: "126372819408"
};

firebase.initializeApp(config);
var database = firebase.database();

app.controller('editorCtrl', function($scope) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";

  $scope.level = {
    //World Base
    name: "template",
    gravity: {
      x:100,
      y:100
    },
    friction: 0.5,
    //stiffness(1e5),
    impactEvent: true,
    platforms: [],
    /*
       [{
       type: "default",
       id: 0,
       x: 0,
       y: 0,
       height: 0,
       width: 0
       }],
       */
    ais: [],
    /*[{
      type: "default",
      id: 0,
      x: 0,
      y: 0,
      height: 0,
      width: 0
      }],
      */
    special: []
      /*[{
        type: "default",
        id: 0,
        x: 0,
        y: 0,
        height: 10,
        width: 0
        }]
        */
  };

  //$scope.level = null;
  $scope.levels = [];
  $scope.saveBlocks = function(){
    //$scope.levels = localStorage.getItem("levels");

    $scope.level.blockPlacement = [];
    for(var i = 0; i < existingBlocks.length; i++){
      var tmp = {
        name: "",
        x: -100,
        y: -100,
        width: 0,
        height: 0
      };
      tmp.x = existingBlocks[i].body.x;
      tmp.y = existingBlocks[i].body.y;
      tmp.width  = existingBlocks[i].width;
      tmp.height = existingBlocks[i].height;
      $scope.level.blockPlacement.push(tmp);
    }

    var is_new = true;
    for(var i = 0; i < $scope.levels.length; i++){
      if($scope.levels[i].name == $scope.level.name){
        console.log("What In" , $scope.levels[i].name);
        console.log("What Saving" , $scope.level.name);
        console.log("It Exist");
        $scope.levels[i] = angular.copy($scope.level);
        is_new = false;
        break;
      }
    }
    if(is_new){ 
      console.log("Make A New One");
      $scope.levels.push(angular.copy($scope.level));
    }
    //localStorage.setItem($scope.level.name, JSON.stringify($scope.level));
    localStorage.setItem("levels", $scope.levels);
  }

  $scope.getLevelBox = function(){
    //Level Box Is All The Stacks of Levels made
    localStorage.getItem("levels");
  }



  $scope.loadBlocks = function(name){
    localStorage.setItem(name, JSON.stringify($scope.level));
  }

  /*
     for ( var i = 0, len = localStorage.length; i < len; ++i ) {
     console.log( localStorage.getItem( localStorage.key( i ) ) );
     }

  /*
  firebase.database().ref('level/' + $scope.level.name).set({
  level: JSON.stringify($scope.level),
  });
  */


});
