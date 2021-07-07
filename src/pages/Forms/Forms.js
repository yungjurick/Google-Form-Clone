import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import FormsNavBar from '../../components/Navbar/FormsNavBar';
import FormsEdit from './FormsEdit';

const Forms = () => {
  const { formUid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const splitPath = pathname.split('/');
    const formStatus = splitPath[splitPath.length - 1];

    if (formUid === '') {
      history.push('/forms');
    } else if (formStatus !== 'edit' && formStatus !== 'response') {
      history.push(`/forms/${formUid}/edit`);
    }
  }, [pathname, formUid])

  return (
    <FormsLayout>
      <FormsNavBar/>
      <FormsContainer>
        <Switch>
          <Route exact path="/forms/:formsUid/edit">
            <FormsEdit />
          </Route>
          <Route exact path="/forms/:formsUid/response">
            YOLO
          </Route>
        </Switch>
      </FormsContainer>
    </FormsLayout>
  )
}

const FormsLayout = styled.div`
  width: 100%;
  min-height: 100vh;
`
const FormsContainer = styled.div``

export default Forms