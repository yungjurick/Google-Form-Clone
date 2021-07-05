import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={}/>
          <Route exact path="/users/login" component={}/>
          <Route exact path="/users/signup" component={}/>

          <Route exact path="/forms" component={}/>
          {/* Nested w/ Questions Page & Response Page */}
          <Route exact path="/forms/:formUid" component={}/>

          {/* Form for Users To Input Answers */}
          <Route exact path="/form/:formUid" component={}/>
        </Switch>
      </Router>
    )
  }
}
export default Routes;