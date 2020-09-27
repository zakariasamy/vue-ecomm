import firebase from 'firebase';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAHdowboREheFK6DKN0sSQJembfJP4UFXg",
    authDomain: "vue-ecommerce-ccee6.firebaseapp.com",
    databaseURL: "https://vue-ecommerce-ccee6.firebaseio.com",
    projectId: "vue-ecommerce-ccee6",
    storageBucket: "vue-ecommerce-ccee6.appspot.com",
    messagingSenderId: "645708635359",
    appId: "1:645708635359:web:3a12c03d418b3b022d1d6a",
    measurementId: "G-RJRDYPXM5Z"
};
// Initialize Firebase
export const fb =firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
firebase.analytics();