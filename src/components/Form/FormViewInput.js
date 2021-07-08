import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import FormViewTextarea from './FormViewTextarea';

const FormViewInput = ({
  type,
  value = '',
  handleOnChangeText,
  isErrorActive
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormInputWrapper type={type}>
      <FormViewTextarea
        type={type}
        value={value}
        handleOnChangeText={handleOnChangeText}
        setIsFocused={setIsFocused}
      />
      <FormInputBottomDefaultShadow isErrorActive={isErrorActive} />
      <FormInputBottomActiveShadow active={isFocused} />
    </FormInputWrapper>
  )
}

const FormInputWrapper = styled.div`
  width: ${props => props.type === 'long-answer' ? '100%' : '50%'};
  position: relative;
  & + & {
    margin-top: 8px;
  }
  border-radius: 4px 4px 0 0;
  background-color: white;
  padding: 0;
`

const FormInputBottomDefaultShadow = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${props => props.isErrorActive ? 'rgb(219, 68, 55)' : 'rgba(0,0,0,0.12)'};
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
  background-color: ${props => props.active ? 'rgb(219, 68, 55)' : 'rgba(0,0,0,0.1)'};
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

export default FormViewInput;