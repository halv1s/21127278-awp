import admin from 'firebase-admin';

console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log(
  'FIREBASE_PRIVATE_KEY:',
  process.env.FIREBASE_PRIVATE_KEY ? 'Loaded' : 'Not loaded',
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: process.env.FIREBASE_PROJECT_ID,
  });
}

export const db = admin.firestore();
