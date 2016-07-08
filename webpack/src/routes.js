import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './App'
import * as Page from 'pages'

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Page.PapersToReview} />
    </Route>
  )
}
