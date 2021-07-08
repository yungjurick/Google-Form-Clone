import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import {
  FormViewQuestionContent,
  FormViewQuestionWrapper,
  FormViewQuestionHeader,
  FormViewQuestionError,
  FormViewTitle,
  FormViewSubtitle
} from '../../styles/FormView';

import FormViewOptionResponse from './FormViewOptionResponse';
import FormViewTextResponse from './FormViewTextResponse';

const FormViewQuestion = ({
  question,
  formResponses,
  onChangeResponse
}) => {
  const {
    uuid,
    questionType,
    title,
    subtitle,
    isRequired,
    options,
    isErrorActive
  } = question

  return (
    <FormViewQuestionContent
      isErrorActive={isErrorActive}
    >
      <FormViewQuestionWrapper>
        <FormViewQuestionHeader>

          {/* Question Title */}
          <FormViewTitle>
            {title}
            {
              isRequired &&
              <span>*</span>
            }
          </FormViewTitle>
          
          {/* Question Subtitle */}
          { 
            subtitle !== undefined &&
            <FormViewSubtitle>
              {subtitle}
            </FormViewSubtitle>
          }

        </FormViewQuestionHeader>
        
        {/* Question Response */}
        {
          (
            questionType === 'short-answer' ||
            questionType === 'long-answer'
          )
          ? <FormViewTextResponse
            questionType={questionType}
            questionUid={uuid}
            response={formResponses[uuid] || ''}
            onChangeResponse={onChangeResponse}
            isErrorActive={isErrorActive}
          />
          : <FormViewOptionResponse
            questionType={questionType}
            questionUid={uuid}
            questionOptions={options}
            response={formResponses[uuid] || []}
            onChangeResponse={onChangeResponse}
            isRequired={isRequired}
          /> 
        }
        {
          isErrorActive && (
            <FormViewQuestionError>
              <MdErrorOutline size="24px" color="#d93025"/>
              <span>필수 질문입니다.</span>
            </FormViewQuestionError>
          )
        }
      </FormViewQuestionWrapper>
    </FormViewQuestionContent>
  )
}

export default FormViewQuestion;