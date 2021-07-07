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
      title: '',
      isRequired: false
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
        const newQuestion = createDefaultQuestion();
        onAddQuestion(activeQuestionUid, newQuestion);
        return;
      default:
        return;
    }
  }

  const onAddQuestion = (baseQuestionUid, data) => {
    const cp = [...questions];

    console.log(data);

    // If Base Question Uid is given
    if (baseQuestionUid) {
      const index = cp.findIndex(q => q.uuid === baseQuestionUid);
      setQuestions([
        ...cp.slice(0, index),
        data,
        ...cp.slice(index)
      ]);

    // If Base Question Uid is not given - add at the last index
    } else {
      cp.push(data);
      setQuestions(cp);
    }
  }

  const onCopyQuestion = (questionUid) => {
    const index = questions.findIndex(q => q.uuid === questionUid);
    console.log(questionUid, questions, questions[index]);
    onAddQuestion(questionUid, { ...questions[index], uuid: uuid() });
  }

  const onChangeQuestion = (questionUid, data) => {
    // On Change Form Title or Form Subtitle
    if (questionUid === formDetails.uuid) {
      const temp = { ...formDetails, ...data };
      setFormDetails(temp);
    
    // On Change Question Key-Val
    } else {
      console.log("FormsEdit - On Change Question: ", questionUid, data);
      const cp = [...questions];
      const index = cp.findIndex(q => q.uuid === questionUid);
      cp[index] = { ...cp[index], ...data };
      console.log(cp);
      setQuestions(cp);
    }
  }

  const onDeleteQuestion = (questionUid) => {
    const cp = [...questions];
    const filtered = cp.filter(q => q.uuid !== questionUid);
    setQuestions(filtered);
  }
  const onDeleteQuestionKey = (questionUid, key) => {
    const cp = [...questions];
    const index = cp.findIndex(q => q.uuid === questionUid);
    delete cp[index][key]
    setQuestions(cp);
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
                onCopyQuestion={onCopyQuestion}
                onDeleteQuestion={onDeleteQuestion}
                onDeleteQuestionKey={onDeleteQuestionKey}
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