import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';

import FormQuestionActive from './FormQuestionActive';
import FormQuestionStatic from './FormQuestionStatic';

const FormQuestion = ({
  questionData,
  onClickQuestion,
  onChangeQuestion,
  onCopyQuestion,
  onDeleteQuestion,
  onDeleteQuestionKey,
  isActive,
}) => {

  const { uuid, questionType, title, isRequired } = questionData;
  const subtitle = questionData.subtitle;
  const options = (questionData.options || []);

  console.log(questionData);

  const handleOnChangeQuestion = (data) => {
    onChangeQuestion(uuid, data);
  }

  const handleOnChangeIsRequired = () => {
    onChangeQuestion(uuid, {
      'isRequired': !isRequired
    });
  }

  const handleOnCopyQuestion = () => {
    onCopyQuestion(uuid);
  }

  const handleOnDeleteQuestion = () => {
    onDeleteQuestion(uuid)
  }

  const handleOnChangeSubtitle = () => {
    if (subtitle === undefined) {
      onChangeQuestion(uuid, {
        'subtitle': ''
      })
    } else {
      onDeleteQuestionKey(uuid, 'subtitle')
    }
  }

  return (
    <FormQuestionWrapper
      isActive={isActive}
      onClick={e => onClickQuestion(e, uuid)}
    >
      {
        isActive
        ?
        <FormQuestionActive
          questionType={questionType}
          title={title}
          subtitle={subtitle}
          isRequired={isRequired}
          handleOnChangeQuestion={handleOnChangeQuestion}
          handleOnCopyQuestion={handleOnCopyQuestion}
          handleOnDeleteQuestion={handleOnDeleteQuestion}
          handleOnChangeSubtitle={handleOnChangeSubtitle}
          handleOnChangeIsRequired={handleOnChangeIsRequired}
          options={options}
        />
        :
        <FormQuestionStatic
          questionType={questionType}
          isRequired={isRequired}
          title={title}
          subtitle={subtitle}
          options={options}
        />
      }

      {/* Border Line */}
      { questionType === 'form-title' && <FormQuestionTopBorder/> }
      { isActive && <FormQuestionLeftBorder isTitleAndDescription={questionType === 'form-title'}/>}
    </FormQuestionWrapper>
  )
}

const FormQuestionWrapper = styled.div`
  padding: 22px 0 0 0;
  border: 1px solid #dadce0;
  border-radius: 8px;
  width: 100%;
  background-color: #fff;
  position: relative;
  min-height: 100px;
  box-shadow: ${props => props.isActive ? '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)' : 'none'};
  transition: box-shadow 280ms cubic-bezier(0.4,0.0,0.2,1);
  & + & {
    margin-top: 12px;
  }
`

const FormQuestionLeftBorder = styled.div`
  height: ${props => props.isTitleAndDescription ? 'calc(100% + -8px)' : '100%'};
  left: -1px;
  padding-right: 5px;
  position: absolute;
  bottom: -1px;
  width: 6px;
  background-color: #4285f4;
  border-bottom-left-radius: 8px;
  border-top-left-radius: ${props => props.isTitleAndDescription ? '0' : '8px'};
`

const FormQuestionTopBorder = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  position: absolute;
  top: -1px;
  width: calc(100% + 2px);
  background-color: rgb(219, 68, 55);
`

export default FormQuestion;