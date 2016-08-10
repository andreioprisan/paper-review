const CHANGE = 'reviews/CHANGE'
const SUBMIT = 'reviews/SUBMIT'
export const SUBMIT_SUCCESS = 'reviews/SUBMIT_SUCCESS'
const SUBMIT_FAIL = 'reviews/SUBMIT_FAIL'

const initialState = {
  data: {},
  result: null,
  error: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT:
      return {
        ...state,
        submitting: true,
        submitted: false
      }
    case SUBMIT_SUCCESS:
      return {
        submitting: false,
        submitted: true,
        error: null,
        result: action.result
      }
    case SUBMIT_FAIL:
      return {
        ...state,
        submitting: false,
        error: action.error
      }
    case CHANGE:
      let data = {...state.data}
      data[action.paperId] = data[action.paperId] || {}
      data[action.paperId][action.questionId] = action.value
      return {
        ...state,
        data
      }
    default:
      return state
  }
}

export function submit(paperId, answers) {
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    promise: client => client.post(`papers/${paperId}/reviews`, { data: { answers } })
  }
}

export function change(paperId, questionId, value) {
  return {
    type: CHANGE,
    paperId: paperId,
    questionId: questionId,
    value: value
  }
}
