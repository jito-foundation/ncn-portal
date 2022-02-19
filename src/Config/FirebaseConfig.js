import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCIGqlecXCKJ4wXHRJI1MO_YCEhOa5O0Sc",
  authDomain: "watch-nft.firebaseapp.com",
  projectId: "watch-nft",
  storageBucket: "watch-nft.appspot.com",
  messagingSenderId: "758682423676",
  appId: "1:758682423676:web:0e670a5caf0e65750214f9",
  measurementId: "G-KW9X0LTYB4"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase