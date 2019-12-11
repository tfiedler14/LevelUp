export const setLoading = () => {
  return {
    type: "SET_LOADING"
  }
};

export const endLoading = () => {
  return{
    type: "END_LOADING"
  }
};

export const getLoading = () => {
  console.log('bip');
  return {
    type: "GET_LOADING"
  }
};