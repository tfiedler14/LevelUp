import { firebaseApp } from '../../../Const';
import { setLocation } from '../location/actions';

export const setAuth = (auth) => {
    return {
        type: "SET_AUTH",
        auth
    }
};

export const signOut = () => {
    firebaseApp
    .auth()
      .signOut()
      .then(response => {
        setAuth({ loggedIn: false, email: "", uid: "" });
        setLocation('home');
      })
      .catch(error => {
        console.log("Failed to sign out.");
        throw error;
      });
};