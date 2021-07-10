import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import FormEditTextarea from './FormEditTextarea';

const FormEditQuestionInput = ({
  size,
  target,
  value,
  handleOnChangeQuestion,
  addNewOption
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const textareaPlaceholder = target => {
    switch (target) {
      case 'title':
        return 'Question Title';
      case 'subtitle':
        return 'Question Subtitle';
      case 'label':
        return 'Option Label';
      default:
        return '';
    }
  }

  const handleOnChange = (key, val) => {
    handleOnChangeQuestion({ [key]: val })
  }

  return (
    <FormInputWrapper
      target={target}
      onMouseEnter={e => setIsHovered(true)}
      onMouseLeave={e => setIsHovered(false)}
    >
      <FormEditTextarea
        target={target}
        size={size}
        value={value}
        placeholder={textareaPlaceholder(target)}
        handleOnChangeQuestion={handleOnChange}
        addNewOption={addNewOption}
        setIsFocused={setIsFocused}
      />
      <FormInputBottomDefaultShadow target={target} isHovered={isHovered} />
      <FormInputBottomActiveShadow active={isFocused} />
    </FormInputWrapper>
  )
}

const FormInputWrapper = styled.div`
  position: relative;
  & + & {
    margin-top: 8px;
  }
  border-radius: 4px 4px 0 0;
  margin-left: ${props => props.target === 'label' ? '10px' : '0'};
  flex: ${props => props.target === 'title' ? '1' : ''};
  width: 100%;
  background-color: ${props => props.target === 'title' ? 'rgb(248,249,250)' : 'white'};
  padding: ${props => props.target === 'title' ? '16px' : '0'};
`

const FormInputBottomDefaultShadow = styled.div`
  position: absolute;
  display: ${props => {
    if (props.target === 'label') {
      if (props.isHovered) {
        return 'block';
      } else {
        return 'none';
      }
    } else {
      return 'block';
    }
  }};
  transform: translateX(-50%);
  left:50%;
  bottom: 0;
  background-color: ${props => props.target === 'title' ? '#80868b' : 'rgba(0,0,0,0.12)'};
  height: 1px;
  width: 100%;
  margin: 0;
  padding: 0;
`

const FormInputBottomActiveShadow = styled.div`
  position:absolute;
  bottom:0px;
  height:2px;
  background-color: ${props => props.active ? 'rgb(219, 68, 55);' : 'rgba(0,0,0,0.1)'};
  transform: translateX(-50%);
  left:50%;
  transition:0.2s all linear;
  animation-duration: .3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-name: ${props => props.active ? underline : ''};
`

const underline = keyframes`
  0% {
    width:0;
  }
  100% {
    width:100%
  }
`

export default FormEditQuestionInput;