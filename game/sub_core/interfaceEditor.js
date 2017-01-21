(function(){

  var app = angular.module('editor', [ ]);

  app.controller('EditorController', function($scope, $http){

    //$scope.loadList = [];
    $scope.loadList = creationList;
    $scope.level = [];

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
      localStorage.removeItem("levelAiPlacement");
      localStorage.removeItem("levelBlockPlacement");
      localStorage.removeItem("levelStmpPlacement");
      localStorage.removeItem("levelSfloPlacement");
      localStorage.setItem("levelAiPlacement", JSON.stringify($scope.level.aiPlacement));
      localStorage.setItem("levelBlockPlacement", JSON.stringify($scope.level.blockPlacement));
      localStorage.setItem("levelStmp", JSON.stringify($scope.level.StmpPlacement));
      localStorage.setItem("levelSflo", JSON.stringify($scope.level.SfloPlacement));

      //var test = JSON.parse(localStorage.getItem("level"));
      //console.log("Storage Tr", test);
      //console.log("Storage ex", $scope.level);
      console.log

    }

    $scope.lookAtInfo = function(x){
      console.log("I am Loading", x);
      creation = x.name;
      console.log(creation);
    }

  });
})();

