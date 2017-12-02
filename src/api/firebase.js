import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCury58BxlFMXb_Hdr5_2XagRuUCyFqBss',
  authDomain: 'ucan-71f28.firebaseapp.com',
  databaseURL: 'https://ucan-71f28.firebaseio.com',
  projectId: 'ucan-71f28',
  storageBucket: 'ucan-71f28.appspot.com',
  messagingSenderId: '134026842403'
};

firebase.initializeApp(config);

export let db = firebase.firestore();
firebase.firestore().enablePersistence().then(() => {
  db = firebase.firestore();
});
