const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require("dotenv").config()

const serviceAccount = {
    type: process.env.FIREBASE_KEY_TYPE,
    project_id: process.env.FIREBASE_PROJECTID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEYID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URL,
    token_uri: process.env.FIREBASE_TOKEN_URL,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

initializeApp({
  credential: cert(serviceAccount)
});

const firebaseDB = getFirestore();

module.exports = {
  firebaseDB
}