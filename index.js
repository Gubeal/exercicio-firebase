const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onTaskCreateTemp = functions
    .database
    .ref('tasks/{taskId}')
    .onCreate((snapshot, context) => {
       const json = snapshot.val();
       //console.log(json);
       const key = context.params.taskId;
       const newObj = {
           createdAt: context.timestamp
       };

       const newObjOther = {
        junin: "junin"
       };
       const log = Object.assign(newObj, json, newObjOther);

       // pode ser assim:
       //const algo = "/logs/"+ key;
       //ou assim (interpolation javascript):
       return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });

exports.onTaskDeleteTemp = functions
    .database
    .ref('tasks/{taskId}')
    .onDelete((snapshot, context) => {
        const json = snapshot.val();
        const key = context.params.taskId;
        const newObj = {
            deletedAt: context.timestamp
        }
        const log = Object.assign(json, newObj);
        return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
