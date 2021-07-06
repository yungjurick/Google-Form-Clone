import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Landing from './pages/Landing';
import Forms from './pages/Forms/Forms';
import FormsList from './pages/Forms/FormsList';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          {/* <Route exact path="/users/login" component={}/>
          <Route exact path="/users/signup" component={}/> */}

          <Route exact path="/forms" component={FormsList}/>
          {/* Nested w/ Questions Page & Response Page */}
          <Route path="/forms/:formUid" component={Forms}/>

          {/* Form for Users To Input Answers */}
          {/* <Route exact path="/form/:formUid" component={}/> */}
        </Switch>
      </Router>
    )
  }
}
export default Routes;