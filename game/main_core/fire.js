var config = {
  apiKey: "AIzaSyCULscWToLDhqWGLNEv08evsGa5hbo_9sM",
  authDomain: "dragons-den-ad546.firebaseapp.com",
  databaseURL: "https://dragons-den-ad546.firebaseio.com",
  storageBucket: "dragons-den-ad546.appspot.com",
  messagingSenderId: "126372819408"
};
firebase.initializeApp(config);
var database = firebase.database();

var levelAiPlacement;
var levelBlockPlacement;
var levelStmp;
var levelSflo;
var loadedIn = false;
var sameOld = false; //Instead This Will Be Version Level
                     //That Way we wont have to keep loading
var version = 12;

getSomething();

function getSomething(){
  if (localStorage.getItem("sameOld") === null || localStorage.getItem("sameOld") != version ){
    console.log("Going to Load In");
  }else{
    console.log("didn't need to loadback");
    console.log("Version:", version);
    return;
  }
  console.log("gone through");

  //if(!sameOld) return;
  return firebase.database().ref('/level/pilot').once('value').then(function(snapShot) {
    //var username = snapshot.val().username;
    console.log("DID THIS EVER HAPPEN");
    levelAiPlacement = JSON.parse(snapShot.val().aiPlacement);
    levelBlockPlacement = JSON.parse(snapShot.val().blockPlacement);
    levelStmp = JSON.parse(snapShot.val().specialPlacement);
    levelSflo= JSON.parse(snapShot.val().tmpspecialPlacement);

    localStorage.setItem("levelAiPlacement", JSON.stringify(levelAiPlacement));
    localStorage.setItem("levelBlockPlacement", JSON.stringify(levelBlockPlacement));
    localStorage.setItem("levelStmp", JSON.stringify(levelStmp));
    localStorage.setItem("levelSflo", JSON.stringify(levelSflo));
    sameOld = version;
    localStorage.setItem("sameOld", (sameOld));

    loadedIn = true;
  });
}

