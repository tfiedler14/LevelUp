import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB8O__d6Iph8zyEUIBTcXSgZkB9vvwUs9o",
    authDomain: "levelup-10cfc.firebaseapp.com",
    databaseURL: "https://levelup-10cfc.firebaseio.com",
    storageBucket: "",
};

export const databaseSecret = "D1ExzUbYDYreTuI7wrk1EphceuNN6Ssxgs9vt9rj";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const attributes1 = [
    'academics', 'crafts', 'mental', 'fitness', 'community', 'hobby'
];
export const avatars = [
    'https://i.imgur.com/s70WG3H.png', 'https://i.imgur.com/D7h7R6L.png',
    'https://i.imgur.com/DxZ4yJO.png', 'https://i.imgur.com/ofnJ0lZ.png',
    'https://i.imgur.com/0gtU6Do.png'
];
export const NUM_AVATARS = 4;
export const colors = {'academics' : '#fff600','crafts' : '#60cafa','mental' : '#d971ff','fitness' : '#ff005c', 'community' : '#00ff8c','hobby' : '#ff8500'};
