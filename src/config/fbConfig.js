import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC8hRiRDW-V6iWz81B3ROPh5-ZjtTTEuPQ",
    authDomain: "tasty-po.firebaseapp.com",
    databaseURL: "https://tasty-po.firebaseio.com",
    projectId: "tasty-po",
    storageBucket: "tasty-po.appspot.com",
    messagingSenderId: "1016800447462"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;