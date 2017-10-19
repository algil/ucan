import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyCury58BxlFMXb_Hdr5_2XagRuUCyFqBss',
  authDomain: 'ucan-71f28.firebaseapp.com',
  databaseURL: 'https://ucan-71f28.firebaseio.com',
  projectId: 'ucan-71f28',
  storageBucket: 'ucan-71f28.appspot.com',
  messagingSenderId: '134026842403'
});

export const db = app.database();
export const servicesRef = db.ref('services');
