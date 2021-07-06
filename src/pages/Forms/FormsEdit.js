import React, { useState } from 'react';
import styled from 'styled-components';

import FormQuestion from '../../components/Form/FormQuestion';

const FormsEdit = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const onClickQuestion = index => setActiveQuestionIndex(index);

  return (
    <FormQuestionsLayout>
      <FormQuestionsContainer>
        <FormQuestion
          isTitleAndDescription
          onClick={() => onClickQuestion(0)}
          isActive
        />
      </FormQuestionsContainer>
    </FormQuestionsLayout>
  )
}

const FormQuestionsLayout= styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(250,227,225);
`

const FormQuestionsContainer = styled.div`
  width: 50%;
  margin: auto;
  padding-bottom: 64px;
`

export default FormsEdit