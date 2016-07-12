import React, { Component } from 'react'
import { PaperReview as PaperReviewContainer } from 'containers'
import { asyncConnect } from 'redux-connect'
import { loadDetail, isLoadedDetail } from 'redux/modules/papers'


@asyncConnect([{
  promise: ({ store: { dispatch, getState }, params }) => {
    if (!isLoadedDetail(params.paperId, getState())) {
      return dispatch(loadDetail(params.paperId))
    }
  }
}])
export default class PaperReview extends Component {
  render() {
    const { paperId } = this.props.params

    return <PaperReviewContainer paperId={paperId} />
  }
}
