import React, { Fragment } from 'react'
import styled from 'styled-components';

import FormInput from './FormInput';
import FormQuestionInput from './FormQuestionInput';
import FormQuestionTypeDropdown from './FormQuestionTypeDropdown';
import FormQuestionOption from './FormQuestionOption';
import FormQuestionAction from './FormQuestionAction';

const FormQuestionActive = ({
  questionType,
  title,
  subtitle,
  handleOnChangeQuestion,
  handleOnCopyQuestion,
  handleOnDeleteQuestion,
  handleOnChangeSubtitle,
  options,
}) => {
  return (
    <Fragment>
      {/* For Form Title And Description */}
      { questionType === 'form-title' && (
        <FormTitle>
          <FormInput
            size="large"
            value={title}
            target="title"
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormInput
            size="small"
            value={subtitle}
            target="subtitle"
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
        </FormTitle>
      )}

      { questionType !== 'form-title' && (
        <Fragment>
          <FormQuestionTitle>
            <FormQuestionInput
              size="small"
              value={title}
              target="title"
              handleOnChangeQuestion={handleOnChangeQuestion}
            />
            <FormQuestionTypeDropdown
              isOptionsEmpty={options.length === 0}
              questionType={questionType}
              handleOnChangeQuestion={handleOnChangeQuestion}
            />
          </FormQuestionTitle>
          {
            subtitle !== undefined &&
            <FormQuestionSubtitleWrapper>
              <FormQuestionInput
                size="extrasmall"
                value={subtitle}
                target="subtitle"
                handleOnChangeQuestion={handleOnChangeQuestion}
              />
            </FormQuestionSubtitleWrapper>
          }
          <FormQuestionOption
            questionType={questionType}
            options={options}
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormQuestionAction
            handleOnDeleteQuestion={handleOnDeleteQuestion}
            handleOnCopyQuestion={handleOnCopyQuestion}
            handleOnChangeSubtitle={handleOnChangeSubtitle}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

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

const FormQuestionSubtitleWrapper = styled.div`
  padding: 0 24px;
  margin-bottom: 16px;
`

export default FormQuestionActive;