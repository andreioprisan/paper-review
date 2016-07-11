import React, { Component } from 'react'
import styles from './style.css'
import Viewer from 'components/Viewer'

export default class PapersToReview extends Component {
  render() {
    return (
      <div>
        <div className={styles.wrapper}>PapersToReview</div>
        <Viewer documentId={1} />
      </div>
    )
  }
}
