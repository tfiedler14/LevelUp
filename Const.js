import firebase from "firebase";

const firebaseConfig = {
    apiKey: "key",
    authDomain: "domain",
    databaseURL: "url",
    storageBucket: "",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);