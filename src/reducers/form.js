export const SET_FORM = "SET_FORM"
export const setForms = (form) => ({
  type: SET_FORM,
  payload: form
})

const initialState = {
  form: {
    uuid: '',
    creatorUid: '',
    title: '',
    subtitle: '',
    lastUpdated: '',
    questions: []
  }
}

const form = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM:{
      return {
        forms: action.payload,
      }
    }

    default:
      return state;
  }
};

export default form;