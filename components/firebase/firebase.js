import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

/*const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};*/

const config = {
    apiKey: "AIzaSyBbqweZos1e2nFncCWsQCfg4g6rmh0Fu6Q",
    authDomain: "portfolio-cde79.firebaseapp.com",
    databaseURL: "https://portfolio-cde79-default-rtdb.firebaseio.com",
    projectId: "portfolio-cde79",
    storageBucket: "portfolio-cde79.appspot.com",
    messagingSenderId: "1024276894008",
  }; 

  const app = firebase;
  /*
  const app = firebase.initializeApp(config)
  const base = Rebase.createClass(app.database())
  const db = firebase.database(app)

  export { db, base }*/