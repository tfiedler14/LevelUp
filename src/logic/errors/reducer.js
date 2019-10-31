export default (state = {signIn: false}, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return action.errors;
    default:
      return state;
  }
}
