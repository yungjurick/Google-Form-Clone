import React from 'react';
import {
  FormViewQuestionContent,
  FormViewQuestionWrapper,
  FormViewTitle,
  FormViewSubtitle
} from '../../styles/FormView';

import {
  FormQuestionTopBorder
} from '../../styles/FormQuestion';

import { useHistory } from 'react-router';

const FormViewTitleAndDescription = ({
  formData,
  hasRequired = false,
  isSubmitSuccess = false
}) => {
  const { push } = useHistory();

  const navigateToViewForm = uuid => {
    push(`/viewform/${uuid}`);
  }

  return (
    <FormViewQuestionContent>
      <FormViewQuestionWrapper formTitle>
        <FormViewTitle primary>
          {formData.title}
        </FormViewTitle>
        { 
          formData.subtitle.length > 0 &&
          <FormViewSubtitle primary>
            {formData.subtitle}
          </FormViewSubtitle>
        }
        {
          hasRequired &&
          <FormViewSubtitle primary red>
            * Required
          </FormViewSubtitle>
        }
        {
          isSubmitSuccess &&
          <FormViewSubtitle
            primary
            link
            onClick={e => navigateToViewForm(formData.uuid)}
          >
            Submit other response
          </FormViewSubtitle>
        }
      </FormViewQuestionWrapper>
      <FormQuestionTopBorder/>
    </FormViewQuestionContent>
  )
}

export default FormViewTitleAndDescription;