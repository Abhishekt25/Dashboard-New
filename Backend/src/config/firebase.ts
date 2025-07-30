import admin from 'firebase-admin';
import path from 'path';

// Adjust the path to your JSON key
const serviceAccount = require(path.resolve(
  __dirname,
  '../reactdashboard-c967c-firebase-adminsdk-fbsvc-d6e49876bc.json'
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
