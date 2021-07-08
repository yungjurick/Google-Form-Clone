export const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
})

const initialState = {
  userProfile: {
    uid: '',
    nickname: '',
    photoUrl: ''
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload
      }
    }

    default:
      return state;
  }
};

export default user;