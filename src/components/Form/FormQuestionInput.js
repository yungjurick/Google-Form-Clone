import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import FormTextarea from './FormTextarea';

const FormQuestionInput = ({ size, target, value, handleOnChangeQuestion }) => {
  const [isFocused, setIsFocused] = useState(false);

  const textareaPlaceholder = target => {
    switch (target) {
      case 'title':
        return 'Question Title';
      case 'subtitle':
        return 'Question Subtitle';
      default:
        return '';
    }
  }

  return (
    <FormInputWrapper>
      <FormTextarea
        target={target}
        size={size}
        value={value}
        placeholder={textareaPlaceholder(target)}
        handleOnChangeQuestion={handleOnChangeQuestion}
        setIsFocused={setIsFocused}
      />
      <FormInputBottomDefaultShadow />
      <FormInputBottomActiveShadow active={isFocused} />
    </FormInputWrapper>
  )
}

const FormInputWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  & + & {
    margin-top: 8px;
  }
  border-radius: 4px 4px 0 0;
  background-color: rgb(248,249,250);
  padding: 16px;
`

const FormInputBottomDefaultShadow = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.12);
  height: 1px;
  width: 100%;
  margin: 0;
  padding: 0;
`

const FormInputBottomActiveShadow = styled.div`
  position:absolute;
  z-index: 10;
  bottom:0px;
  left:0px;
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
  0% {width:0}
  100% {width:100%}
`

export default FormQuestionInput;