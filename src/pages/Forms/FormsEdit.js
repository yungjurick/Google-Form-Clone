import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { uuid } from 'uuidv4';

import FormQuestion from '../../components/Form/FormQuestion';
import FormSidePanel from '../../components/Form/FormSidePanel';

const FormsEdit = () => {
  const createDefaultQuestion = () => {
    return {
      uuid: uuid(),
      questionType: 'short-answer',
      title: ''
    }
  }

  const [activeQuestionUid, setActiveQuestionUid] = useState(null);
  const [formDetails, setFormDetails] = useState({
    uuid: uuid(),
    questionType: 'form-title',
    title: '',
    subtitle: ''
  })
  const [questions, setQuestions] = useState([]);

  const onClickQuestion = (e, uuid) => {
    setActiveQuestionUid(uuid)
  };

  const onClickPanelButton = buttonType => {
    switch(buttonType) {
      case 'add':
        console.log('Add Question')
        return;
      default:
        return;
    }
  }

  const onChangeQuestion = (questionUid, key, value) => {
    // On Change Form Title or Form Subtitle
    if (questionUid === formDetails.uuid) {
      const temp = { ...formDetails, [key]: value };
      setFormDetails(temp);
    
    // On Change Question Key-Val
    } else {
      const cp = [...questions];
      const index = cp.findIndex(q => q.uuid === questionUid);
      console.log(index);
      cp[index] = { ...cp[index], [key]: value };
      setQuestions(cp);
    }
  }

  useEffect(() => {
    if (questions.length === 0) {
      console.log("Fill in Empty Questions")
      const cp = [];
      cp.push(createDefaultQuestion());
      setQuestions(cp);
    }
  }, [])

  return (
    <FormQuestionsLayout>
      <FormQuestionsContainer>
        <FormSidePanel onClickPanelButton={onClickPanelButton}/>
        {/* Form Title And Description */}
        <FormQuestion
          isTitleAndDescription
          questionData={formDetails}
          onClickQuestion={onClickQuestion}
          onChangeQuestion={onChangeQuestion}
          isActive={activeQuestionUid === formDetails.uuid}
        />
        {
          questions.map(q => {
            return (
              <FormQuestion
                key={q.uuid}
                questionData={q}
                onClickQuestion={onClickQuestion}
                onChangeQuestion={onChangeQuestion}
                isActive={activeQuestionUid === q.uuid}
              />
            )
          })
        }
      </FormQuestionsContainer>
    </FormQuestionsLayout>
  )
}

const FormQuestionsLayout= styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(250,227,225);
  padding-top: 14px;
`

const FormQuestionsContainer = styled.div`
  width: 50%;
  margin: auto;
  padding-bottom: 64px;
  position: relative;
  min-width: 360px;
`

export default FormsEdit