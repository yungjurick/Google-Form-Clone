export const SET_FORM = "SET_FORM"
export const SET_DEFAULT_FORM = "SET_DEFAULT_FORM"
export const SET_FORM_QUESTIONS = "SET_FORM_QUESTIONS"
export const SET_FORM_TITLE = "SET_FORM_TITLE"
export const SET_FORM_SUBTITLE = "SET_FORM_SUBTITLE"
export const SET_SAVE_FORM_KEY = "SET_SAVE_FORM_KEY"
export const SET_SAVE_FORM_STATUS = "SET_SAVE_FORM_STATUS"
export const SET_SUCCESS_FORM = "SET_SUCCESS_FORM"
export const SET_FORM_RESPONSES = "SET_FORM_RESPONSES"

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

export const setSaveFormKey = (key) => ({
  type: SET_SAVE_FORM_KEY,
  payload: key
})

export const setSaveFormStatus = (status) => ({
  type: SET_SAVE_FORM_STATUS,
  payload: status
})

export const setSuccessForm = (form) => ({
  type: SET_SUCCESS_FORM,
  payload: form
})

export const setFormResponses = (responses) => ({
  type: SET_FORM_RESPONSES,
  payload: responses
})

const initialState = {
  saveFormKey: '',
  saveFormStatus: 0,
  successForm: {
    uuid: '',
    title: ''
  },
  form: {
    uuid: '',
    creatorUid: '',
    title: '',
    subtitle: '',
    lastUpdated: '',
    questions: []
  },
  formResponses: []
}

const form = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM:{
      return {
        saveFormKey: '',
        saveFormStatus: 0,
        form: action.payload,
        formResponses: []
      }
    }

    case SET_DEFAULT_FORM:{
      return {
        ...state,
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
        ...state,
        saveFormKey: 'questions',
        form: {
          ...state.form,
          questions: action.payload
        }
      }
    }

    case SET_FORM_TITLE:{
      return {
        ...state,
        saveFormKey: 'title',
        form: {
          ...state.form,
          title: action.payload
        }
      }
    }

    case SET_FORM_SUBTITLE:{
      return {
        ...state,
        saveFormKey: 'subtitle',
        form: {
          ...state.form,
          subtitle: action.payload
        }
      }
    }

    case SET_SAVE_FORM_KEY:{
      return {
        ...state,
        saveFormKey: action.payload
      }
    }

    case SET_SAVE_FORM_STATUS:{
      return {
        ...state,
        saveFormStatus: action.payload
      }
    }

    case SET_SUCCESS_FORM: {
      return {
        ...state,
        successForm: action.payload
      }
    }

    case SET_FORM_RESPONSES:{
      return {
        ...state,
        formResponses: action.payload
      }
    }

    default:
      return state;
  }
};

export default form;