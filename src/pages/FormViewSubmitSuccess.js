import React, { useEffect, useState } from 'react';

import {
  FormViewLayout,
  FromViewContainer,
  FormViewRow,
  FormViewBottomTitle,
} from '../styles/FormView';

import FormViewTitleAndDescription from '../components/Form/FormViewTitleAndDescription';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { setSuccessForm } from '../reducers/form';

const FormViewSubmitSuccess = () => {
  const {
    uuid,
    title
  } = useSelector(state => state.form.successForm);
  const { push } = useHistory();
  const { formUid } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    uuid: '',
    title: ''
  })

  useEffect(() => {
    console.log(uuid, title);
    if (uuid === '') {
      push(`/viewform/${formUid}`);
    } else {
      setFormData({ uuid, title });
      dispatch(setSuccessForm({
        uuid: '',
        title: ''
      }))
    }
  }, [])

  return (
    <FormViewLayout>
      <FromViewContainer>
        <FormViewTitleAndDescription
          formData={{
            ...formData,
            subtitle: 'Your reponse has been recorded.'
          }}
          isSubmitSuccess
        />
        <FormViewRow>
          <p>This content is neither made nor approved by G-ooo-gle Form.</p>
        </FormViewRow>
        <FormViewBottomTitle>
          G-ooo-gle Form
        </FormViewBottomTitle>
      </FromViewContainer>
    </FormViewLayout>
  )
}

export default FormViewSubmitSuccess;