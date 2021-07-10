import React, { useEffect, useRef } from 'react';
import FormQuestionActive from './FormQuestionActive';
import FormQuestionStatic from './FormQuestionStatic';
import {
  FormQuestionWrapper,
  FormQuestionLeftBorder,
  FormQuestionTopBorder
} from '../../styles/FormQuestion'

const FormQuestion = ({
  index = -1,
  questionData,
  onClickQuestion,
  onChangeQuestion,
  onCopyQuestion,
  onMoveQuestion,
  onDeleteQuestionKey,
  onDeleteQuestion,
  onActiveQuestion,
  isActive,
}) => {
  const questionRef = useRef(null);
  const { uuid, questionType, title, isRequired } = questionData;
  const subtitle = questionData.subtitle;
  const options = (questionData.options || []);

  useEffect(() => {
    console.log("isActive", isActive, uuid);
    if (isActive) {
      onActiveQuestion(questionRef);
    }
  }, [isActive, index])

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

  const handleOnMoveQuestion = direction => {
    onMoveQuestion(uuid, direction);
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

  console.log(title, subtitle)

  return (
    <FormQuestionWrapper
      ref={questionRef}
      isActive={isActive}
      onClick={e => onClickQuestion(uuid)}
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
          handleOnMoveQuestion={handleOnMoveQuestion}
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

const areEqual = (prevProps, nextProps) => {
  return (
    (prevProps.isActive === false && nextProps.isActive === false) &&
    prevProps.questionData.uuid === nextProps.questionData.uuid &&
    prevProps.questionData.title === nextProps.questionData.title &&
    prevProps.questionData.subtitle === nextProps.questionData.subtitle &&
    prevProps.index === nextProps.index
  );
}

export default React.memo(FormQuestion, areEqual);