import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FormEditTextarea = ({
  type,
  value = '',
  handleOnChangeText,
  setIsFocused
}) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (textareaRef && type === 'long-answer') {
      textareaRef.current.style.height = '24px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue, type])

  const handleOnBlur = e => {
    setIsFocused(false)
    
    // Check if text-value has changed
    // If changed -> fire handleOnChangeQuestion
    if (value !== textValue) {
      return handleOnChangeText(textValue);
    }
  }

  return (
    <FormInputTextarea
      type={type}
      ref={textareaRef}
      value={textValue}
      placeholder="My response"
      onChange={e => setTextValue(e.target.value)}
      onFocus={e => setIsFocused(true)}
      onBlur={e => handleOnBlur()}
    />
  )
}

const FormInputTextarea = styled.textarea`
  resize: none;
  font-family: Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #202124;
  width: 100%;
  box-sizing: border-box;
  height: 24px;
  border: none;
  white-space: ${props => props.type === 'long-answer' ? 'pre-wrap' : 'normal'};
  word-wrap: ${props => props.type === 'long-answer' ? 'break-wor' : 'normal'};
  overflow-y: ${props => props.type === 'long-answer' ? 'visible' : 'hidden'};
  overflow-x: ${props => props.type === 'long-answer' ? 'hidden' : 'visible'};
  background-color: transparent;
  outline: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default FormEditTextarea