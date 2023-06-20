import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || {});

export function createFirebaseAdminApp() {
  // if already created, return the same instance
  if (admin.apps.length > 0) {
    return admin.app();
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
