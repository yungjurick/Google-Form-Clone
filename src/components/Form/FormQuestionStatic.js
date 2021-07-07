import React from 'react';
import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank } from 'react-icons/md';

import {
  QuestionStaticWrapper,
  Title,
  Subtitle,
  OptionsList,
  OptionsItem,
  OptionsItemText,
  TextResponse
} from '../../styles/QuestionStatic'

const FormQuestionStatic = ({
  questionType,
  isRequired,
  title,
  subtitle,
  options
}) => {
  const createDefaultValue = (questionType, target) => {
    const responseDefaultValues = {
      'short-answer': 'Short Answer',
      'long-answer': 'Long Answer',
    }

    switch(target){
      case 'title':
        if (questionType === 'form-title') {
          return 'Form Title';
        } else {
          return 'Question';
        }
      case 'subtitle':
        if (questionType === 'form-title') {
          return 'Form Subtitle';
        } else {
          return 'Question Subtitle';
        }
      case 'response':
        return responseDefaultValues[questionType];
      default:
        return ''
    }
  }

  return (
    <QuestionStaticWrapper>
      <Title primary={questionType === 'form-title'}>
        {title.length > 0 ? title : createDefaultValue(questionType, 'title')}
        {isRequired && <span>*</span>}
      </Title>
      { 
        subtitle !== undefined &&
        <Subtitle primary={questionType === 'form-title'}>
          {subtitle.length > 0 ? subtitle : createDefaultValue(questionType, 'subtitle')}
        </Subtitle>
      }
      {
        (questionType === 'short-answer' || questionType === 'long-answer') &&
        <TextResponse long={questionType === 'long-answer'}>
          {createDefaultValue(questionType, 'response')}
        </TextResponse>
      }
      {
        (
          options.length > 0 &&
          (questionType === 'checkbox' || questionType === 'radio')
        ) && 
        <OptionsList>
          {
            options.map(option => {
              if (questionType === 'checkbox') {
                return (
                  <OptionsItem key={option.uuid}>
                    <MdCheckBoxOutlineBlank size="1.4em" color="rgba(0,0,0,0.26)"/>
                    <OptionsItemText>{option.label}</OptionsItemText>
                  </OptionsItem>
                )
              } else {
                return (
                  <OptionsItem key={option.uuid}>
                    <MdRadioButtonUnchecked size="1.4em" color="rgba(0,0,0,0.26)"/>
                    <OptionsItemText>{option.label}</OptionsItemText>
                  </OptionsItem>
                )
              }
            })
          }
        </OptionsList>
      }
    </QuestionStaticWrapper>
  )  
}

export default FormQuestionStatic;