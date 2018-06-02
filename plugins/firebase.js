import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAtV5Wa4T0r3b7iQDUDd4nTLjiK3E3JywA",
    authDomain: "dsj-events-app.firebaseapp.com",
    databaseURL: "https://dsj-events-app.firebaseio.com",
    projectId: "dsj-events-app",
    storageBucket: "dsj-events-app.appspot.com",
    messagingSenderId: "266119371200"
}

firebase.initializeApp(config)