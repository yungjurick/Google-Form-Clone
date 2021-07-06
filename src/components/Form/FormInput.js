import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const FormInput = ({ size, target, value, handleOnChangeText }) => {

  // Form Input Logic
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const textareaHeight = size => {
    switch (size) {
      case 'large':
        return '50px';
      case 'medium':
        return '21px';
      case 'small':
        return '12px';
      default:
        return '12px';
    }
  }

  const textareaPlaceholder = target => {
    switch (target) {
      case 'form-title':
        return 'Form Title';
      case 'form-subtitle':
        return 'Form Subtitle';
      case 'question-title':
        return 'Question Title';
      default:
        return '';
    }
  }


  useEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = textareaHeight(size);
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, size])

  return (
    <FormInputWrapper>
      <FormInputTextarea
        ref={textareaRef}
        size={size}
        target={target}
        value={value}
        placeholder={textareaPlaceholder(target)}
        onChange={e => handleOnChangeText('title', e)}
        onFocus={e => setIsFocused(true)}
        onBlur={e => setIsFocused(false)}
      />
      <FormInputBottomDefaultShadow/>
      <FormInputBottomActiveShadow active={isFocused} />
    </FormInputWrapper>
  )
}

const FormInputWrapper = styled.div`
  width: 100%;
  position: relative;
  & + & {
    margin-top: 8px;
  }
`

const FormInputTextarea = styled.textarea`
  resize: none;
  font-size: ${props => {
    switch(props.size) {
      case 'large':
        return '32px';
      case 'medium':
        return '14px';
      case 'small':
        return '12px';
      default:
        return '12px';
    }
  }};
  font-family: Roboto,Arial,sans-serif;
  font-weight: 400;
  letter-spacing: .2px;
  color: #202124;
  line-height: 135%;
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  border: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: visible;
  overflow-x: hidden;
  background-color: transparent;
  outline: none;
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

export default FormInput;