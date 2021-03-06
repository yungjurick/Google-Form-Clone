import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import FormEditTextarea from './FormEditTextarea';

const FormEditInput = ({
  size, 
  target,
  value = '',
  handleOnChangeQuestion
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const textareaPlaceholder = target => {
    switch (target) {
      case 'title':
        return 'Form Title';
      case 'subtitle':
        return 'Form Subtitle';
      default:
        return '';
    }
  }

  const handleOnChange = (key, val) => {
    handleOnChangeQuestion({ [key]: val });
  }

  return (
    <FormInputWrapper>
      <FormEditTextarea
        target={target}
        size={size}
        value={value}
        placeholder={textareaPlaceholder(target)}
        handleOnChangeQuestion={handleOnChange}
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
  background-color: white;
  padding: 0;
  display: flex;
  align-items: center;
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

export default FormEditInput;