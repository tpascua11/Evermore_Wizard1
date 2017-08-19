(function(){
  var app = angular.module('editor', [ ]);

 app.controller('EditorController', function($scope, $http){

    //$scope.loadList = [];
    $scope.loadList = creationList;
    $scope.level = [];

    //----------------------
    //!!!!
    //----------------------
    //  All Of The Save Variables Look The Same.
    //  Enemies, Collisions Fields, Specials variables are the same
    //  We can just do this instead
    //  "Level0"
    //  name: level0
    //
    //  Transition Stones Are Not Saved in Levels
    //  They will be saved as a universal waypoint
    //  in that was they can reference the level that were made in
    //  and also referecnce other stones

    $scope.saveLevel = function(){
      $scope.level.aiPlacement = [];
      $scope.level.blockPlacement = [];
      $scope.level.StmpPlacement = [];
      $scope.level.SfloPlacement = [];
      console.log("ACTIVE AI", activeAI);
      console.log("ACTIVE AI SPRITE ", activeAI[0].name);
      //var take = activeAI[0].name;
      //console.log("Take", take);
      //AI PLACEMENT
      for(var i = 0; i < activeAI.length; i++){
        var tmp = {
          name: "r",
          x: 1,
          y: 3
        };
        console.log("ID IS: ", i);
        tmp.name = activeAI[i].name;
        tmp.x = activeAI[i].body.x;
        tmp.y = activeAI[i].body.y;
        $scope.level.aiPlacement.push(tmp);
      }
      //BLOCK PLACEMENT
      for(var i = 0; i < existingBlocks.length; i++){
        var tmp = {
          name: "r",
          x: 1,
          y: 3,
          width: 5,
          height: 5
        };
        tmp.x = existingBlocks[i].body.x;
        tmp.y = existingBlocks[i].body.y;
        tmp.width  = existingBlocks[i].width;
        tmp.height = existingBlocks[i].height;
        $scope.level.blockPlacement.push(tmp);
      }

      //TEMPORARYY SPECIALS
      for(var i = 0; i < tmpSpecials.length; i++){
        var tmp = {
          name: "r",
          x: 0,
          y: 0,
        }
        tmp.name = tmpSpecials[i].name;
        tmp.x    = tmpSpecials[i].x;
        tmp.y    = tmpSpecials[i].y;

        $scope.level.StmpPlacement.push(tmp);
      }
      //FLOW SPECIALS
      for(var i = 0; i < floSpecials.length; i++){
        var tmp = {
          name: "r",
          x: 0,
          y: 0,
        }
        tmp.name = floSpecials[i].name;
        tmp.x    = floSpecials[i].x;
        tmp.y    = floSpecials[i].y;

        $scope.level.SfloPlacement.push(tmp);
      }
      /*
         localStorage.removeItem("levelAiPlacement");
         localStorage.removeItem("levelBlockPlacement");
         localStorage.removeItem("levelStmpPlacement");
         localStorage.removeItem("levelSfloPlacement");
         localStorage.setItem("levelAiPlacement", JSON.stringify($scope.level.aiPlacement));
         localStorage.setItem("levelBlockPlacement", JSON.stringify($scope.level.blockPlacement));
         localStorage.setItem("levelStmp", JSON.stringify($scope.level.StmpPlacement));
         localStorage.setItem("levelSflo", JSON.stringify($scope.level.SfloPlacement));*/

      var levelThing = JSON.stringify($scope.level);
      console.log("levelThing", levelThing);
      //var levelName
      /*
         firebase.database().ref('level/pilot').set({
         aiPlacement: JSON.stringify($scope.level.aiPlacement),
         blockPlacement: JSON.stringify($scope.level.blockPlacement),
         specialPlacement: JSON.stringify($scope.level.SfloPlacement),
         tmpspecialPlacement: JSON.stringify($scope.level.StmpPlacement)
         });*/

      //var test = JSON.parse(localStorage.getItem("level"));
      //console.log("Storage Tr", test);
      //console.log("Storage ex", $scope.level);

    }

    $scope.levelName = "Basic";
    $scope.saveLevelAlpha = function(){
      $scope.levelAlpha = [];
      $scope.levelAlpha.length = 0;
      var tmp = {
        name: "r",
        x: 1,
        y: 3,
        width: 5,
        height: 5
      };
      //AI Placement
      for(var i = 0; i < activeAI.length; i++){
        tmp.name = activeAI[i].name;
        tmp.x = activeAI[i].body.x;
        tmp.y = activeAI[i].body.y;
        $scope.levelAlpha.push(tmp);
      }
      //BLOCK PLACEMENT
      for(var i = 0; i < existingBlocks.length; i++){
        tmp.x = existingBlocks[i].body.x;
        tmp.y = existingBlocks[i].body.y;
        tmp.width  = existingBlocks[i].width;
        tmp.height = existingBlocks[i].height;
        $scope.levelAlpha.push(tmp);
      }
      //TEMPORARYY SPECIALS
      for(var i = 0; i < tmpSpecials.length; i++){
        tmp.name = tmpSpecials[i].name;
        tmp.x    = tmpSpecials[i].x;
        tmp.y    = tmpSpecials[i].y;
        $scope.levelAlpha.push(tmp);
      }
      //FLOW SPECIALS
      for(var i = 0; i < floSpecials.length; i++){
        tmp.name = floSpecials[i].name;
        tmp.x    = floSpecials[i].x;
        tmp.y    = floSpecials[i].y;
        $scope.levelAlpha.push(tmp);
      }
      console.log($scope.levelAlpha);
      console.log(JSON.stringify($scope.levelAlpha));

      localStorage.removeItem($scope.levelName);
      localStorage.setItem($scope.levelName, JSON.stringify($scope.levelAlpha));
    }

    $scope.saveLevelAs = function(name) {
      $scope.levelName = name;
    }
    $scope.loadLevel = function(name) {
      localStorage.removeItem(name);
      //localStorage.getItem(name);
      scope.levelName = name;
    }

    $scope.lookAtInfo = function(x){
      console.log("I am Loading", x);
      creation = x.name;
      console.log(creation);
    }

  });
})();

