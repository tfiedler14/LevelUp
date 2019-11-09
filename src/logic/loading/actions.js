export const setLoading = (loading) => {
  console.log("INSIDE LOADING");
  return {
    type: "SET_LOADING",
    loading
  }
};