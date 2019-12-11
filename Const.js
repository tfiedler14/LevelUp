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
    'https://i.imgur.com/s70WG3H.png', 'https://i.imgur.com/D7h7R6L.png',
    'https://i.imgur.com/DxZ4yJO.png', 'https://i.imgur.com/ofnJ0lZ.png',
    'https://i.imgur.com/0gtU6Do.png'
];
export const NUM_AVATARS = 4;
export const colors = {'academics' : 'yellow','crafts' : 'blue','mental' : 'purple','fitness' : 'red', 'community' : 'green','hobby' : 'orange'};
