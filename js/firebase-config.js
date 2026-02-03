// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD39e8kHj48E72HC3V4Pk9oMo_ALcQpOXY",
    authDomain: "pamertassgo.firebaseapp.com",
    projectId: "pamertassgo",
    storageBucket: "pamertassgo.firebasestorage.app",
    messagingSenderId: "334204261484",
    appId: "Y1:334204261484:web:607040c29084532eeeb449"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
const auth = firebase.auth();