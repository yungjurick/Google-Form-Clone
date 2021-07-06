import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';

import FormInput from './FormInput';
import FormQuestionTypeDropdown from './FormQuestionTypeDropdown';
import FormQuestionOption from './FormQuestionOption';
import FormQuestionAction from './FormQuestionAction';

const FormQuestion = ({
  questionData,
  onClickQuestion,
  onChangeQuestion,
  isActive,
}) => {

  const { uuid, questionType, title } = questionData;
  const subtitle = (questionData.subtitle || undefined);
  const options = (questionData.options || []);

  const handleOnChangeQuestion = (key, value) => {
    console.log(key, value);
    onChangeQuestion(uuid, key, value);
  }

  console.log(uuid, questionType, title);

  return (
    <FormQuestionWrapper
      isActive={isActive}
      onClick={e => onClickQuestion(e, uuid)}
    >
      {/* For Form Title And Description */}
      { questionType === 'form-title' && (
        <FormTitle>
          <FormInput
            size="large"
            value={title}
            target="form-title"
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormInput
            size="small"
            value={subtitle}
            target="form-subtitle"
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormQuestionTopShadow/>
        </FormTitle>
      )}

      { questionType !== 'form-title' && (
        <Fragment>
          <FormQuestionTitle>
            <FormInput
              size="small"
              value={title}
              target="question-title"
              handleOnChangeQuestion={handleOnChangeQuestion}
            />
            <FormQuestionTypeDropdown
              questionType={questionType}
              handleOnChangeQuestion={handleOnChangeQuestion}
            />
          </FormQuestionTitle>
          <FormQuestionOption
            questionType={questionType}
            options={options}
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormQuestionAction />
        </Fragment>
      )}

      { isActive && <FormQuestionLeftShadow
        isTitleAndDescription={questionType === 'form-title'}
      />}
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

const FormTitle = styled.div`
  padding: 0 24px 24px 24px;
`

const FormQuestionTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 24px;
  margin-bottom: 16px;
`

const FormQuestionLeftShadow = styled.div`
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

const FormQuestionTopShadow = styled.div`
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