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
        <div className="cwrapper">
          <div className="content">
            <div className="cbox">
              <h3>Papers to review</h3>
              <div className="ultable">
                <ul className="lister lheader">
                  <li>Name</li>
                  <li>State</li>
                </ul>
                {data.map((item, key) => <PapersListItem key={key} {...item} />)}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <div />
  }
}
