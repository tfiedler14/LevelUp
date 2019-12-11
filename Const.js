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

export const avatars = [
    'https://i.imgur.com/UiKFeEK.png', 'https://i.imgur.com/vZSJAK4.png',
    'https://i.imgur.com/yFAH4g4.png', 'https://i.imgur.com/uwXVrNm.png',
    'https://i.imgur.com/uIHDjmn.png'
];
export const NUM_AVATARS = 5;
