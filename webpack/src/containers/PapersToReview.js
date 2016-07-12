import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PapersListItem from 'components/PapersListItem'

@connect(
  state => ({
    papers: state.papers
  })
)
export default class PapersToReview extends Component {
  static propTypes = {
    papers: PropTypes.object.isRequired
  }

  render() {
    const {
      loading,
      data
    } = this.props.papers

    if (loading) {
      return <div>Loading ... </div>
    }

    if (data && !data.error && !loading) {
      return (
        <ul>
          {data.map((item, key) => <PapersListItem key={key} {...item} />)}
        </ul>
      )
    }

    return <div />
  }
}
