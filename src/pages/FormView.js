import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, firebase } from '../firebase';

import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setLoading } from '../reducers/loading';

import {
  FormQuestionWrapper,
  FormQuestionTopBorder,
  QuestionStaticWrapper,
  Title,
  Subtitle
} from '../styles/FormQuestion';

import FormViewOptionResponse from '../components/Form/FormViewOptionResponse';
import FormViewTextResponse from '../components/Form/FormViewTextResponse';

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
        setFormData(data);

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
  }
  
  console.log(formResponses);

  return (
    <FormViewLayout>
      <FromViewContainer>
        {/* Form Title & Subtitle Container */}
        <FormViewQuestion>
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
          </FormViewQuestionWrapper>
          <FormQuestionTopBorder/>
        </FormViewQuestion>
        {
          formData.questions.map(q => {
            return (
              <FormViewQuestion key={q.uid}>
                <FormViewQuestionWrapper>
                  <FormViewQuestionHeader>

                    {/* Question Title */}
                    <FormViewTitle>
                      {q.title}
                      {
                        q.isRequired &&
                        <span>*</span>
                      }
                    </FormViewTitle>
                    
                    {/* Question Subtitle */}
                    { 
                      q.subtitle !== undefined &&
                      <FormViewSubtitle>
                        {q.subtitle}
                      </FormViewSubtitle>
                    }

                  </FormViewQuestionHeader>
                  
                  {/* Question Response */}
                  {
                    (
                      q.questionType === 'short-answer' ||
                      q.questionType === 'long-answer'
                    )
                    ? <FormViewTextResponse
                      questionType={q.questionType}
                      questionUid={q.uuid}
                      response={formResponses[q.uuid] || ''}
                      onChangeResponse={onChangeResponse}
                    />
                    : <FormViewOptionResponse
                      questionType={q.questionType}
                      questionUid={q.uuid}
                      questionOptions={q.options}
                      response={formResponses[q.uuid] || []}
                      onChangeResponse={onChangeResponse}
                    />
                  }
                </FormViewQuestionWrapper>
              </FormViewQuestion>
            )
          })
        }
        <FormViewRow>
          <FormViewButton>
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

const FormViewLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(250,227,225);
`

const FromViewContainer = styled.div`
  margin: auto;
  max-width: 90vw;
  width: 640px;
  padding: 12px 0;
`

const FormViewQuestion = styled(FormQuestionWrapper)`
  padding: 0;
  min-height: 0;
`

const FormViewQuestionWrapper = styled(QuestionStaticWrapper)`
  height: 100%;
  padding: ${props => props.formTitle ? '22px 24px 24px 24px' : '24px'};
`

const FormViewQuestionHeader = styled.div`
  margin-bottom: 16px;
`

const FormViewTitle = styled(Title)`
  padding: 0;
  margin: 0;
  & > span {
    font-size: 16px;
    color: #d93025;
    margin-right: 24px;
    padding-left: .25em;
  }
`
const FormViewSubtitle = styled(Subtitle)`
  margin: ${props => props.primary ? '12px 0 0 0' : '4px 0 0 0'};
  padding: 0;
  white-space: pre-wrap;
  color: ${props => props.red ? '#d93025' : '#202124'};
`

const FormViewRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > p, span {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .3px;
    line-height: 16px;
    color: rgba(0,0,0,0.66);
  }
  & > span {
    margin-top: 8px;
  }
  & > p {
    text-align: center;
    margin: 16px 0;
    width: 100%;
  }
`

const FormViewBottomTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 22.1px;
  position: relative;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: rgba(0,0,0,0.36);
  letter-spacing: -0.5px;
`

const FormViewButton = styled.button`
  margin-top: 12px;
  margin-bottom: 10px;
  outline: none;
  border: none;
  padding: 0 24px;
  color: white;
  background-color: rgb(219,69,55);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .25px;
  line-height: 36px;
`

export default FormView;