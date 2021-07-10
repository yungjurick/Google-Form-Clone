import React, { Fragment } from 'react'
import styled from 'styled-components';

import FormEditInput from './FormEditInput';
import FormEditQuestionInput from './FormEditQuestionInput';
import FormQuestionTypeDropdown from './FormQuestionTypeDropdown';
import FormQuestionOption from './FormQuestionOption';
import FormQuestionAction from './FormQuestionAction';

const FormQuestionActive = ({
  questionType,
  isRequired,
  title,
  subtitle,
  handleOnChangeQuestion,
  handleOnCopyQuestion,
  handleOnDeleteQuestion,
  handleOnMoveQuestion,
  handleOnChangeSubtitle,
  handleOnChangeIsRequired,
  options,
}) => {
  return (
    <Fragment>
      {/* For Form Title And Description */}
      { questionType === 'form-title' && (
        <FormTitle>
          <FormEditInput
            size="large"
            value={title}
            target="title"
            handleOnChangeQuestion={handleOnChangeQuestion}
          />
          <FormEditInput
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
            <FormEditQuestionInput
              size="medium"
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
              <FormEditQuestionInput
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
            isRequired={isRequired}
            handleOnChangeQuestion={handleOnChangeQuestion}
            handleOnDeleteQuestion={handleOnDeleteQuestion}
            handleOnCopyQuestion={handleOnCopyQuestion}
            handleOnChangeSubtitle={handleOnChangeSubtitle}
            handleOnChangeIsRequired={handleOnChangeIsRequired}
            handleOnMoveQuestion={handleOnMoveQuestion}
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