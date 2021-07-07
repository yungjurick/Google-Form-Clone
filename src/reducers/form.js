export const SET_FORM = "SET_FORM"
export const SET_DEFAULT_FORM = "SET_DEFAULT_FORM"
export const SET_FORM_QUESTIONS = "SET_FORM_QUESTIONS"
export const SET_FORM_TITLE = "SET_FORM_TITLE"
export const SET_FORM_SUBTITLE = "SET_FORM_SUBTITLE"

export const setForm = (form) => ({
  type: SET_FORM,
  payload: form
})

export const setDefaultForm = () => ({
  type: SET_DEFAULT_FORM
})

export const setFormQuestions = (questions) => ({
  type: SET_FORM_QUESTIONS,
  payload: questions
})

export const setFormTitle = (title) => ({
  type: SET_FORM_TITLE,
  payload: title
})

export const setFormSubtitle = (subtitle) => ({
  type: SET_FORM_SUBTITLE,
  payload: subtitle
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
        form: action.payload,
      }
    }

    case SET_DEFAULT_FORM:{
      return {
        form: {
          uuid: '',
          creatorUid: '',
          title: '',
          subtitle: '',
          lastUpdated: '',
          questions: []
        },
      }
    }

    case SET_FORM_QUESTIONS:{
      return {
        form: {
          ...state.form,
          questions: action.payload
        }
      }
    }

    case SET_FORM_TITLE:{
      return {
        form: {
          ...state.form,
          title: action.payload
        }
      }
    }

    case SET_FORM_SUBTITLE:{
      return {
        form: {
          ...state.form,
          subtitle: action.payload
        }
      }
    }

    default:
      return state;
  }
};

export default form;