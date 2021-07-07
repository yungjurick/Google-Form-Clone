import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { uuid } from 'uuidv4';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormQuestions,
  setFormTitle,
  setFormSubtitle
} from '../../reducers/form';

import FormQuestion from '../../components/Form/FormQuestion';
import FormSidePanel from '../../components/Form/FormSidePanel';

const FormsEdit = () => {
  const dispatch = useDispatch();
  const {
    uuid: formUid,
    title,
    subtitle,
    questions
  } = useSelector(state => state.form.form);

  const createDefaultQuestion = () => {
    return {
      uuid: uuid(),
      questionType: 'short-answer',
      title: '',
      isRequired: false
    }
  }

  const formDetails = () => {
    return {
      uuid: formUid,
      questionType: 'form-title',
      title,
      subtitle
    }
  }

  const [activeQuestionUid, setActiveQuestionUid] = useState(null);

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
      dispatch(setFormQuestions([
        ...cp.slice(0, index),
        data,
        ...cp.slice(index)
      ]));

    // If Base Question Uid is not given - add at the last index
    } else {
      cp.push(data);
      dispatch(setFormQuestions(cp));
    }
  }

  const onCopyQuestion = (questionUid) => {
    const index = questions.findIndex(q => q.uuid === questionUid);
    console.log(questionUid, questions, questions[index]);
    onAddQuestion(questionUid, { ...questions[index], uuid: uuid() });
  }

  const onChangeQuestion = (questionUid, data) => {
    // On Change Form Title or Form Subtitle
    if (questionUid === formUid) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        if (key === 'title') {
          dispatch(setFormTitle(data[key]))
        } else if (key === 'subtitle') {
          dispatch(setFormSubtitle(data[key]))
        }
      })
    
    // On Change Question Key-Val
    } else {
      console.log("FormsEdit - On Change Question: ", questionUid, data);
      const cp = [...questions];
      const index = cp.findIndex(q => q.uuid === questionUid);
      cp[index] = { ...cp[index], ...data };
      console.log(cp);
      dispatch(setFormQuestions(cp));
    }
  }

  const onDeleteQuestion = (questionUid) => {
    const cp = [...questions];
    const filtered = cp.filter(q => q.uuid !== questionUid);
    dispatch(setFormQuestions(filtered));
  }
  const onDeleteQuestionKey = (questionUid, key) => {
    const cp = [...questions];
    const index = cp.findIndex(q => q.uuid === questionUid);
    delete cp[index][key]
    dispatch(setFormQuestions(cp));
  }

  useEffect(() => {
    if (questions.length === 0) {
      console.log("Fill in Empty Questions")
      const cp = [];
      cp.push(createDefaultQuestion());
      dispatch(setFormQuestions(cp));
    }
  }, [])

  return (
    <FormQuestionsLayout>
      <FormQuestionsContainer>
        <FormSidePanel onClickPanelButton={onClickPanelButton}/>
        {/* Form Title And Description */}
        <FormQuestion
          isTitleAndDescription
          questionData={formDetails()}
          onClickQuestion={onClickQuestion}
          onChangeQuestion={onChangeQuestion}
          isActive={activeQuestionUid === formUid}
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