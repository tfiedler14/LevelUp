export default (state = 0, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return ++state;
    case 'END_LOADING':
      return --state;
    case 'GET_LOADING':
      return state;
    default:
      return state;
  }
};
