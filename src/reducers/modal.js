export const SET_PROFILE_DROPDOWN_STATUS = "SET_PROFILE_DROPDOWN_STATUS"
export const SET_SEND_MODAL_FORM_STATUS = "SET_SEND_MODAL_FORM_STATUS"

export const setProfileDropdownStatus = (status) => ({
  type: SET_PROFILE_DROPDOWN_STATUS,
  payload: status
})

export const setSendModalFormStatus = (status) => ({
  type: SET_SEND_MODAL_FORM_STATUS,
  payload: status
})

const initialState = {
  isProfileDropdownOpen: false,
  isSendFormModalOpen: false
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DROPDOWN_STATUS:{
      return {
        ...state,
        isProfileDropdownOpen: action.payload
      }
    }

    case SET_SEND_MODAL_FORM_STATUS:{
      return {
        ...state,
        isSendFormModalOpen: action.payload
      }
    }

    default:
      return state;
  }
};

export default modal;