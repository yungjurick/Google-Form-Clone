import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { uuid } from 'uuidv4';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormQuestions,
  setFormTitle,
  setFormSubtitle,
  setSaveFormKey,
  setSaveFormStatus
} from '../../reducers/form';
import { db, firebase } from '../../firebase';

import FormQuestion from '../../components/Form/FormQuestion';
import FormSidePanel from '../../components/Form/FormSidePanel';

const FormsEdit = () => {
  const dispatch = useDispatch();

  const form = useSelector(state => state.form.form);
  const saveFormKey = useSelector(state => state.form.saveFormKey);

  const [activeQuestionRef, setActiveQuestionRef] = useState(null);
  const [activeQuestionUid, setActiveQuestionUid] = useState(null);
  const [panelTopValue, setPanelTopValue] = useState(0);

  const [newActiveUid, setNewActiveUid] = useState('');

  /* 
    Save Status
      1. Update Redux first
      2. Then update firestore
  */
  useEffect(() => {
    const updateForm = async (key, value) => {
      const formRef = db.collection('forms').doc(form.uuid);
      
      dispatch(setSaveFormStatus(1));

      await formRef.update({
        [key]: value,
        lastUpdated: firebase.firestore.Timestamp.now().seconds
      })

      dispatch(setSaveFormKey(''));
      dispatch(setSaveFormStatus(2));
    }

    if (saveFormKey) {
      console.log("Saving Target:", saveFormKey);
      updateForm(saveFormKey, form[saveFormKey]);
    }
  }, [saveFormKey])

  useEffect(() => {
    if (activeQuestionRef && activeQuestionRef.current) {
      setPanelTopValue(activeQuestionRef.current.offsetTop);
    }
  }, [activeQuestionRef, activeQuestionUid, form.questions])

  useEffect(() => {
    if (newActiveUid) {
      setActiveQuestionUid(newActiveUid);
    }
  }, [newActiveUid])

  const createDefaultQuestion = () => {
    return {
      uuid: uuid(),
      questionType: 'short-answer',
      title: '',
      isRequired: false
    }
  }

  const onClickQuestion = (uuid) => {
    setActiveQuestionUid(uuid);
  };

  const onActiveQuestion = (ref) => {
    setActiveQuestionRef(ref);
  }

  const onClickPanelButton = (buttonType) => {
    switch(buttonType) {
      case 'add':
        const newQuestion = createDefaultQuestion();
        onAddQuestion(activeQuestionUid, newQuestion, true);
        return;
      default:
        return;
    }
  }

  const onAddQuestion = (baseQuestionUid, data, placeAfter = false) => {
    const cp = [...form.questions];

    console.log("[Add New Question]", {
      baseQuestionUid,
      data,
      placeAfter,
      cp
    })

    // If Base Question Uid is within questions
    if (baseQuestionUid && baseQuestionUid !== form.uuid) {
      const index = cp.findIndex(q => q.uuid === baseQuestionUid);
      if (placeAfter) {
        dispatch(setFormQuestions([
          ...cp.slice(0, index+1),
          data,
          ...cp.slice(index+1)
        ]));
      } else {
        dispatch(setFormQuestions([
          ...cp.slice(0, index),
          data,
          ...cp.slice(index)
        ]));
      }

    // Add at the first index
    } else {
      dispatch(setFormQuestions([
        data,
        ...cp
      ]));
    }

    setNewActiveUid(data.uuid);
  }

  const onCopyQuestion = (questionUid) => {
    const index = form.questions.findIndex(q => q.uuid === questionUid);
    onAddQuestion(questionUid, { ...form.questions[index], uuid: uuid() });
  }

  const onChangeQuestion = (questionUid, data) => {
    // On Change Form Title or Form Subtitle
    if (questionUid === form.uuid) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        if (key === 'title') {

          // Always make sure title is not an empty string
          if (data[key] === '') {
            dispatch(setFormTitle('No Named Form'))
          } else {
            dispatch(setFormTitle(data[key]))
          }

        } else if (key === 'subtitle') {
          dispatch(setFormSubtitle(data[key]))
        }
      })
    
    // On Change Question Key-Val
    } else {
      console.log("FormsEdit - On Change Question: ", questionUid, data);
      const cp = [...form.questions];
      const index = cp.findIndex(q => q.uuid === questionUid);
      cp[index] = { ...cp[index], ...data };
      dispatch(setFormQuestions(cp));
    }
  }

  const onDeleteQuestionKey = (questionUid, key) => {
    const cp = [...form.questions];
    const index = cp.findIndex(q => q.uuid === questionUid);
    delete cp[index][key]
    dispatch(setFormQuestions(cp));
  }

  const onDeleteQuestion = (questionUid) => {
    const cp = [...form.questions];
    const index = cp.findIndex(q => q.uuid === questionUid);
    let newActiveUid;

    if (index === 0) {
      newActiveUid = form.uuid;
    } else {
      newActiveUid = cp[index-1].uuid
    }

    const filtered = cp.filter(q => q.uuid !== questionUid);
    dispatch(setFormQuestions(filtered));

    setNewActiveUid(newActiveUid);
  }

  const onMoveQuestion = (questionUid, direction) => {
    const cp = [...form.questions];
    const index = cp.findIndex(q => q.uuid === questionUid);
    const temp = { ...cp[index] };

    if (direction === 'up' && index !== 0) {
      cp[index] = { ...cp[index-1] };
      cp[index-1] = temp;
    } else if (direction === 'down' && index !== (cp.length - 1)) {
      cp[index] = { ...cp[index+1] };
      cp[index+1] = temp;
    } else {
      return;
    }

    dispatch(setFormQuestions(cp));
  }

  return (
    <FormQuestionsLayout>
      <FormQuestionsContainer>
        <FormSidePanel
          topValue={panelTopValue}
          onClickPanelButton={onClickPanelButton}
        />
        {/* Form Title And Description */}
        <FormQuestionList>
          <FormQuestion
            isTitleAndDescription
            questionData={{
              uuid: form.uuid,
              questionType: 'form-title',
              title: form.title,
              subtitle: form.subtitle
            }}
            onClickQuestion={onClickQuestion}
            onChangeQuestion={onChangeQuestion}
            onActiveQuestion={onActiveQuestion}
            isActive={activeQuestionUid === form.uuid}
          />
          {
            form.questions.map((q, i) => {
              return (
                <FormQuestion
                  key={q.uuid}
                  index={i}
                  questionData={q}
                  onClickQuestion={onClickQuestion}
                  onChangeQuestion={onChangeQuestion}
                  onCopyQuestion={onCopyQuestion}
                  onDeleteQuestionKey={onDeleteQuestionKey}
                  onDeleteQuestion={onDeleteQuestion}
                  onMoveQuestion={onMoveQuestion}
                  onActiveQuestion={onActiveQuestion}
                  isActive={activeQuestionUid === q.uuid}
                />
              )
            })
          }
        </FormQuestionList>
      </FormQuestionsContainer>
    </FormQuestionsLayout>
  )
}

const FormQuestionsLayout= styled.div`
  width: 100%;
  height: 100%;
  padding-top: 14px;
`

const FormQuestionsContainer = styled.div`
  width: 50%;
  margin: auto;
  padding-bottom: 64px;
  position: relative;
  max-width: 90vw;
  width: 770px;
`

const FormQuestionList = styled.div`
  width: 100%;
  height: 100%;
`

export default FormsEdit