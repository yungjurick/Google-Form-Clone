import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './pages/Landing';
import FormView from './pages/FormView';
import Forms from './pages/Forms/Forms';
import FormsList from './pages/Forms/FormsList';
import FormViewSubmitSuccess from './pages/FormViewSubmitSuccess';

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
          <Route exact path="/viewform/:formUid" component={FormView}/>
          <Route exact path="/viewform/:formUid/submit-success" component={FormViewSubmitSuccess}/>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default Routes;