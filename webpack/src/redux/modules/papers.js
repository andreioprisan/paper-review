const LOAD = 'papers/LOAD'
const LOAD_SUCCESS = 'papers/LOAD_SUCCESS'
const LOAD_FAIL = 'papers/LOAD_FAIL'

const initialState = {
  loaded: false,
  data: null,
  error: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: null,
        data: action.result
      })
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    default:
      return state
  }
}

export function isLoaded(globalState) {
  return globalState.papers && globalState.papers.loaded
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('papers')
  }
}
