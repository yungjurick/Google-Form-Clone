import React, { Fragment } from 'react';
import styled from 'styled-components';
import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank } from 'react-icons/md';

const FormQuestionStatic = ({
  questionType,
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

const QuestionStaticWrapper = styled.div`
  padding: 0 24px 24px 24px;
`

const Title = styled.p`
  font-size: ${props => props.primary ? '32px' : '16px'};
  letter-spacing: .1px;
  line-height: ${props => props.primary ? '135%' : '24px'};
  font-weight: 400;
  padding-bottom: 8px;
  margin: ${props => props.primary ? '8px 0 0 0' : '0'};
`;
const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: ${props => props.primary ? '#202124' : '#70757a'};
  margin: 0;
  padding-bottom: 16px;
`;
const OptionsList = styled.div`
  
`;
const OptionsItem = styled.div`
  display: flex;
  align-items: center;
`;
const OptionsItemText = styled.p`
  font-family: Roboto,Arial,sans-serif;
  font-weight: 400;
  letter-spacing: .2px;
  color: #202124;
  line-height: 135%;
  font-size: 14px;
  margin-left: 8px;
  padding-bottom: 2px;
`;

const TextResponse = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #202124;
  border-bottom: 1px dotted rgba(0,0,0,0.38);
  padding: 1.75px 0;
  width: ${props => props.long ? '85%' : '40%'};
  margin: 14px 0 8px 0;
`

export default FormQuestionStatic;