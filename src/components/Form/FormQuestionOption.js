import React, { Fragment } from 'react';
import styled from 'styled-components';

import FormQuestionOptionItem from './FormQuestionOptionItem'

const FormQuestionOption = ({
  questionType,
  options,
  handleOnChangeQuestion
}) => {

  const handleOnChangeOption = (uuid, data) => {
    const cp = [...options];
    const index = cp.findIndex(o => o.uuid === uuid)
    cp[index] = { ...cp[index], ...data };

    handleOnChangeQuestion({ 'options': cp });
  }

  const handleAddOption = (data) => {
    const cp = [...options];
    cp.push({
      ...data,
      label: `Option ${options.length + 1}`
    });

    handleOnChangeQuestion({ 'options': cp });
  }

  const handleDeleteOption = (uuid) => {
    const cp = [...options];
    const filtered = cp.filter(o => o.uuid !== uuid);

    handleOnChangeQuestion({ 'options': filtered });
  }

  const emptyOption = {
    uuid: '',
    label: ''
  }

  const optionView = (questionType, options) => {
    switch(questionType) {
      case 'short-answer':
        return <TextAnswerOption>Short Answer Text</TextAnswerOption>;
      case 'long-answer':
        return <TextAnswerOption long>Long Answer Text</TextAnswerOption>;
      case 'checkbox':
        const checkboxes = options.map(option => {
          return (
            <FormQuestionOptionItem
              key={option.uuid}
              type="checkbox"
              option={option}
              showDelete={options.length > 1}
              handleOnChangeQuestion={handleOnChangeOption}
              handleDeleteOption={handleDeleteOption}
            />
          )
        })
        return (
          <Fragment>
            {checkboxes}
            <FormQuestionOptionItem
              type="checkbox"
              isExtra
              option={emptyOption}
              handleAddOption={handleAddOption}
            />
          </Fragment>
        );
      case 'radio':
        const radios = options.map(option => {
          return (
            <FormQuestionOptionItem
              key={option.uuid}
              type="radio"
              option={option}
              showDelete={options.length > 1}
              handleOnChangeQuestion={handleOnChangeOption}
              handleDeleteOption={handleDeleteOption}
            />
          )
        })
        return (
          <Fragment>
            {radios}
            <FormQuestionOptionItem
              type="radio"
              isExtra
              option={emptyOption}
              handleAddOption={handleAddOption}
            />
          </Fragment>
        );
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
  width: ${props => props.long ? '85%' : '40%'};
`

export default FormQuestionOption;