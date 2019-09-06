const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log('cloud function: helloWorld');
    response.send("helloWorld from Firebase!");
});

exports.helloTest = functions.https.onRequest((request, response) => {
    console.log('cloud function: helloTest');
    response.send("helloTest from Firebase!");
});

// Triggers when a new device is registered
exports.sendPushNotification = functions.database.ref('/fcmTokens')
    .onWrite(async (change, context) => {
        // console.log(change.after.val());
        // console.log(context);

        // const getDeviceTokensPromise = admin.database()
        //     .ref(`/fcmTokens`).once('value');

        // let tokensSnapshot;

        // const results = await Promise.all([getDeviceTokensPromise]);
        // tokensSnapshot = results[0];
        
        // tokens = Object.keys(tokensSnapshot.val());
        // console.log(tokens);

        const payload = {
            notification: {
                title: 'Cloud Function',
                body: `Mensagem enviada pelo Cloud Function`,
                icon: 'https://placeimg.com/128/128/people'
            }
        };

        const deviceid = '';

        const response = await admin.messaging().sendToDevice(deviceid, payload);

        response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                console.log(error);
            }
        });
    });