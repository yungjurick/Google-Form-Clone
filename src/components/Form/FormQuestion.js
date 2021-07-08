import React from 'react';
import FormQuestionActive from './FormQuestionActive';
import FormQuestionStatic from './FormQuestionStatic';
import {
  FormQuestionWrapper,
  FormQuestionLeftBorder,
  FormQuestionTopBorder
} from '../../styles/FormQuestion'

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
      { 
        isActive &&
        <FormQuestionLeftBorder
          isTitleAndDescription={questionType === 'form-title'}
        />
      }
    </FormQuestionWrapper>
  )
}

export default FormQuestion;