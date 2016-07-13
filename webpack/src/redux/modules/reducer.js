import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import papers from './papers'
import questions from './questions'
import reviews from './reviews'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  papers,
  questions,
  reviews
})
