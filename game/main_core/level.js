//--------------------------------------------------------------------
// Level Make
//-------------------------------------------------------------------
function worldBase(){

}

function platformBase(){
  level.platforms

}

function aiBase(){

}


function specialBase(){

}

//--------------------------------------------------------------------
//  Copy Base
//--------------------------------------------------------------------
function copyPlatform(params, platform){
  if(!platform) var platform = {};
  var platform = {};
  platform.body = {};
  platform.name = params.name || 0;
  platform.type = params.type || 0;

  platform.body.x = params.body.x || 0;
  platform.body.y = params.body.y || 0;
}
