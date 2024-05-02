import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAV_DYY-AUaniGiFaT8Yo_JIDVlj_s7aMI",
    authDomain: "pucpr-44ac0.firebaseapp.com",
    projectId: "pucpr-44ac0",
    storageBucket: "pucpr-44ac0.appspot.com",
    messagingSenderId: "509174619115",
    appId: "1:509174619115:web:04ecdaf6a137fd5df497ae"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;