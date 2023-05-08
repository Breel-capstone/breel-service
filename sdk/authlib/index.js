const firebaseAdmin = require('firebase-admin');
const firebaseAuth = require('firebase-admin/auth');

module.exports = class Auth {
  constructor(config) {
    this.config = config;

    const { ServiceAccount: serviceAccount } = config.GCP;
    this.firebase = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: serviceAccount.PrivateKey,
        projectId: serviceAccount.ProjectID,
        clientEmail: serviceAccount.ClientEmail,
      }),
    });
  }

  verifyToken = async (firebaseToken) => {
    return await firebaseAuth.getAuth().verifyIdToken(firebaseToken);
  };
};
