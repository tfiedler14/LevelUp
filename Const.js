import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB8O__d6Iph8zyEUIBTcXSgZkB9vvwUs9o",
    authDomain: "levelup-10cfc.firebaseapp.com",
    databaseURL: "https://levelup-10cfc.firebaseio.com",
    storageBucket: "",
};

export const databaseSecret = "D1ExzUbYDYreTuI7wrk1EphceuNN6Ssxgs9vt9rj";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const attributes = [
    'academics', 'crafts', 'mental', 'fitness', 'community', 'hobby'
];
