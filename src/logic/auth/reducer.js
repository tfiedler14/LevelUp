export default (state = { loggedIn: false, email: "", uid: "" }, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return action.auth;
        default:
            return state;
    }
}