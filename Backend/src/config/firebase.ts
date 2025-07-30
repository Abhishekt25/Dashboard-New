import admin from 'firebase-admin';
import path from 'path';

// Get the current directory
const currentDir = __dirname;

try {
  const serviceAccount = require(path.join(
    currentDir,
    '../reactdashboard-c967c-firebase-adminsdk-fbsvc-d6e49876bc.json'
  ));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://reactdashboard-c967c.firebaseio.com'
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error; // Rethrow to prevent further execution
}

const firestore = admin.firestore();

export { firestore };