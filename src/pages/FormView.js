import React, { useEffect, useState } from 'react';
import { db, firebase } from '../firebase';

import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setLoading } from '../reducers/loading';

import {
  FormViewLayout,
  FromViewContainer,
  FormViewRow,
  FormViewBottomTitle,
  FormViewButton,
} from '../styles/FormView';

import FormViewQuestion from '../components/Form/FormViewQuestion';
import FormViewTitleAndDescription from '../components/Form/FormViewTitleAndDescription';
import { setSuccessForm } from '../reducers/form';

const FormView = () => {
  const { formUid } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    uuid: '',
    title: '',
    subtitle: '',
    questions: [],
  });
  const [formResponses, setFormResponses] = useState({})
  const [hasRequired, setHasRequired] = useState(false);

  useEffect(() => {
    const checkHasRequired = questions => {
      questions.forEach(q => {
        if (q.isRequired) {
          setHasRequired(true);
          return;
        }
      })
    }

    const fetchFormData = async () => {
      const formRef = db.collection('forms').doc(formUid);
      const result = await formRef.get();
      const data = result.data();

      console.log("ViewForm Data: ", data);

      if (data === undefined) {
        alert('Invalid Form: The form does not exist.');
        return push('/');
      } else {
        checkHasRequired(data.questions);

        // Add "isErrorActive" field to all questions signify incomplete required question
        const updatedQuestions = data.questions.map(q => {
          return {
            ...q,
            isErrorActive: false
          }
        })

        setFormData({
          ...data,
          questions: updatedQuestions
        });

        // Set Default Response Object
        const defaultResponse = data.questions
          .map(({ uuid, questionType }) => {
            return {
              uuid,
              questionType
            }
          })
          .reduce((acc, { uuid, questionType }) => {
            if (questionType === 'short-answer' || questionType === 'long-answer') {
              acc[uuid] = ''
            } else if (questionType === 'radio' || questionType === 'checkbox') {
              acc[uuid] = []
            }
            return acc
          }, {})
        
        setFormResponses(defaultResponse);
      }
    };

    fetchFormData();
  }, [formUid])

  const onChangeResponse = (questionUid, value) => {
    const temp = { ...formResponses };
    temp[questionUid] = value;

    setFormResponses(temp);
    checkErrorOnChange(questionUid, value);
  }

  const onSubmitForm = async () => {
    const isValid = checkErrorOnSubmit(formData.questions, formResponses);

    if (isValid) {
      dispatch(setLoading(true));
      try {
        await db
          .collection('responses')
          .doc()
          .set({
            formUid: formData.uuid,
            responses: formResponses,
            createdAt: firebase.firestore.Timestamp.now().seconds
          })
        
        // Set Success Form Data
        dispatch(setSuccessForm({
          uuid: formData.uuid,
          title: formData.title
        }));

        // Navigate To Success Page
        push(`/viewform/${formData.uuid}/submit-success`);
      } catch (e) {
        alert(e.message);
      }
      dispatch(setLoading(false));

    } else {
      console.log('Error: Has Incomplete Required Questions');
      alert('Please fill out all the required questions in order to submit the form.');
      
      const updatedQuestions = [...formData.questions]
        .map(q => {
          if (q.isRequired && !q.isErrorActive && (formResponses[q.uuid].length === 0)) {
            return {
              ...q,
              isErrorActive: true
            }
          } else {
            return q;
          }
        });
      
      setFormData({
        ...formData,
        questions: updatedQuestions
      })
    }
  }

  const checkErrorOnChange = (questionUid, value) => {
    const index = formData.questions.findIndex(el => el.uuid === questionUid);
    const targetQuestion = formData.questions[index];

    if (
      (targetQuestion.isRequired && value === '') ||
      (targetQuestion.isErrorActive && value !== '')
    ) {
      const tempQuestions = [...formData.questions];
      tempQuestions[index].isErrorActive = !tempQuestions[index].isErrorActive;

      setFormData({
        ...formData,
        questions: tempQuestions
      })
    }
  }

  const checkErrorOnSubmit = (questions, responses) => {
    const hasIncompleteRequired = questions.findIndex(q => (
      q.isRequired && (responses[q.uuid].length === 0)
    )) > -1;

    return !hasIncompleteRequired
  }
  
  console.log(formResponses);

  return (
    <FormViewLayout>
      <FromViewContainer>
        {/* Form Title & Subtitle Container */}
        <FormViewTitleAndDescription
          formData={formData}
          hasRequired={hasRequired}
        />
        {
          formData.questions.map(q => {
            return (
              <FormViewQuestion
                key={q.uuid}
                question={q}
                formResponses={formResponses}
                onChangeResponse={onChangeResponse}
              />
            )
          })
        }
        <FormViewRow>
          <FormViewButton onClick={e => onSubmitForm()}>
            Submit
          </FormViewButton>
        </FormViewRow>
        <FormViewRow>
          <span>Do not submit password through G-ooo-gle Form.</span>
        </FormViewRow>
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

export default FormView;