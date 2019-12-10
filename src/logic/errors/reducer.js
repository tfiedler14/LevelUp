export default (state = {signIn: false, signUp: false, logout: false, delete: false, email: false, password: false}, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return action.errors;
    default:
      return state;
  }
}
