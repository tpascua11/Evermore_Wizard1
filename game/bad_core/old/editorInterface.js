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
  $scope.selectAreaName = "start";
  $scope.areaName = "start";
  $scope.firstName = "John";
  $scope.lastName = "Doe";
  $scope.area = [];
  $scope.levels = [];

  if(localStorage.getItem("levels")){
    console.log("its not empty", localStorage.getItem("levels"));
    $scope.dog = JSON.parse(localStorage.getItem("levels"));
    console.log($scope.dog);
    $scope.levels = JSON.parse(localStorage.getItem("levels"));
  }
  else{
    console.log("its not empty", localStorage.getItem("levels"));
  }
  console.log("True Setup");
  if(localStorage.getItem("gameArea")){
    $scope.area = JSON.parse(localStorage.getItem("gameArea"));
    console.log("What iS My Area", $scope.area);
  }
  console.log("True Setup");

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

  $scope.saveLevelEntities = function(){
    //Put All Objects In the Current Level to a format where it can be saved
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
  }

  $scope.saveBlocks = function(){
    $scope.saveLevelEntities();

    //Check If The Level Name Has Been Named
    var is_new = true;
    if($scope.levels){
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
    }
    else {
      $scope.levels = [];
    }
    if(is_new){
      console.log("Make A New One");
      $scope.levels.push(angular.copy($scope.level));
    }
    $scope.areaList = [];
    $scope.areaList.push(
        {
          area: $scope.levels,
          name: $scope.areaName
        }
        );
    console.log("game area", $scope.areaList);
    if($scope.checkIfAreaExist("start552")){
      console.log("Found Start522");
    }
    else{
      console.log("Found Start522");
    }
    localStorage.setItem("levels", JSON.stringify($scope.levels));
    localStorage.setItem("areaList", JSON.stringify($scope.areaList));
  }

  $scope.checkIfAreaExist = function(name){
    console.log("Area Check", $scope.areaList);
    for(var i = 0; i < $scope.areaList.length; i++){
      if($scope.areaList[i].name == name){
        console.log("FOUND", name);
        return true;
      }
    }
    return false;
  }

  $scope.loadBox = function(level){
    $scope.level = angular.copy(level);
    console.log("Test ", level);
    for(var i = 0; i < level.blockPlacement.length; i++){
      existingBlocks[i].reset(
          level.blockPlacement[i].x,
          level.blockPlacement[i].y
          );
      existingBlocks[i].width = level.blockPlacement[i].width;
      existingBlocks[i].height = level.blockPlacement[i].height;
    }
  }


  $scope.getLevelBox = function(){
    localStorage.getItem("levels");
  }


  $scope.loadBlocks = function(name){
    localStorage.setItem(name, JSON.stringify($scope.level));
  }


  /*
     firebase.database().ref('level/' + $scope.level.name).set({
     level: JSON.stringify($scope.level),
     });
     */
  //------------------------------------------------------------------
  // Redesign
  //-----------------------------------------------------------------
  //areaList is where all the level is stored at
  $scope.checkIfAreaExist = function(name){
    for(var i = 0; i < $scope.areaList.length; i++){
      if($scope.areaList[i].name == name){
        return true;
      }
    }
    return false;
  }

  $scope.checkIfLevelExist = function(name){
    for(var i = 0; i < $scope.levelList.length; i++){
      if($scope.levelList[i].name == name){
        return true;
      }
    }
    return false;
  }

  $scope.areaList = [];
  $scope.currentLevel;

  $scope.makeNewArea = function (name){
    if($scope.checkIfAreaExist(name)) return;
    $scope.areaList.push(
        {
          name: name,
          levels: []
        }
    );
    console.log("New Area List", $scope.areaList);
  }
  $scope.makeNewLevel = function(name){
    $scope.areaList.push(
        {
          name: name,
          template1: [],
          template2: []
        }
    );
  }

  $scope.loadLevel = function(level){
    $scope.currentLevel = null;
    $scope.currentLevel = level;
  }
  $scope.loadArea = function(area){
    //Current Area = null then
    //Current Level = load
    $scope.currentArea = null;
    $scope.currentArea = area;
  }

  $scope.saveLevel = function(){
  }
  $scope.saveArea = function(){
    //Local Storage Save the Area List
  }

  $scope.deleteLevel = function(){
  }

  $scope.deleteLevel = function(){
  }


});
