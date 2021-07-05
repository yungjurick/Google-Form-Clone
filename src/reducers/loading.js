export const SET_LOADING = "SET_LOADING"
export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status
})

const initialState = {
  isLoading: false
}

const loading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:{
      return {
        isLoading: action.payload,
      }
    }

    default:
      return state;
  }
};

export default loading;