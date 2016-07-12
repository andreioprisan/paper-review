import React, { Component } from 'react'
import { PapersToReview as PapersToReviewContainer } from 'containers'
import { asyncConnect } from 'redux-connect'
import { load, isLoaded } from 'redux/modules/papers'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(load())
    }
  }
}])
export default class PapersToReview extends Component {
  render() {
    return (
      <PapersToReviewContainer />
    )
  }
}
