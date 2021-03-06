const express = require('express');
var admin = require('firebase-admin');
const router = express.Router();

var serviceAccount = require("../wocleaderboard-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wocleaderboard-default-rtdb.firebaseio.com"
});

router.use((req, res, next) => {
  next();
});


router.post('/updateLeaderBoard', (request, response) => {
  console.log("updating leaderboard logs!", request.body);
  // let data = request.body.score;
  // let user = data.split(":")[0].split("=")[1];
  // let score = data.split(":")[1].split("=")[1];
  // if(!user || !score ) {
  //   response.send("Haha nice try. Better spend time buying GME");
  // }
  // const ref = admin.database().ref("/" + user);
  // ref.once("value").then((snapshot) => {
  //   if (snapshot.val() == null) {
  //     ref.set({
  //       score: -1*(parseInt(score)),
  //     });
  //   } else {
  //   	const newScore = parseInt(snapshot.val().score) + -1*parseInt(score);
  //     ref.set({
	//         score: newScore,
  //     });
  //   }
  // });

  response.send("Leaderboard Frozen, Looking forward to your contributions in next season :)");
});

router.get('/getLeaderBoard', (request, response) => {
  console.log("fetching leaderboard logs!");

  const db = admin.database().ref("/");
  let fullDataDump;

  db.orderByChild("score").once("value", function(snapshot) {
	    fullDataDump = snapshotToArray(snapshot);
	    response.status(200).json(fullDataDump);
  });
});

function snapshotToArray(snapshot) {
  const returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
}

module.exports = router;
