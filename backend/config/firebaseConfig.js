const admin = require('firebase-admin');
const serviceAccount = require('../private/serviceAccountKey.json');
require('dotenv').config({path: './backend/.env'});

const databaseURL = process.env.DATABASE_URL;

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

module.exports = firebaseApp;