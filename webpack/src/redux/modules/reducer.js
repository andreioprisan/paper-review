import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import papers from './papers'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  papers
})
