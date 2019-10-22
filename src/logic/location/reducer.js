export default (state = "home", action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return action.location;
        default:
            return state;
    }
}