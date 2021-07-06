import React from 'react';
import styled from 'styled-components';

const FormQuestionOption = ({
  questionType,
  options,
  handleOnChangeQuestion
}) => {
  const optionView = (questionType, options) => {
    switch(questionType) {
      case 'short-answer':
        return <TextAnswerOption>Short Answer Text</TextAnswerOption>;
      case 'long-answer':
        return <TextAnswerOption long>Long Answer Text</TextAnswerOption>;
      case 'checkbox':
        return;
      case 'radio':
        return;
      default:
        return;
    }
  }
  return (
    <FormQuestionOptionContainer>
      {optionView(questionType, options)}
    </FormQuestionOptionContainer>
  )
}

const FormQuestionOptionContainer = styled.div`
  padding: 0 24px 36px 24px;
`

const TextAnswerOption = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #70757a;
  border-bottom: 1px dotted rgba(0,0,0,0.38);
  padding: 1.75px 0;
  margin-top: 8px;
  width: ${props => props.long ? '70%' : '40%'};
`

export default FormQuestionOption;