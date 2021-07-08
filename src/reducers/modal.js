export const SET_PROFILE_DROPDOWN_STATUS = "SET_PROFILE_DROPDOWN_STATUS"

export const setProfileDropdownStatus = (status = '') => ({
  type: SET_PROFILE_DROPDOWN_STATUS,
  payload: status
})

const initialState = {
  isProfileDropdownOpen: false
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DROPDOWN_STATUS:{
      return {
        ...state,
        isProfileDropdownOpen: action.payload
      }
    }

    default:
      return state;
  }
};

export default modal;