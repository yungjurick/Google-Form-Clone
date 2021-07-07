import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FormTextarea = ({
  target,
  size,
  value = '',
  placeholder,
  handleOnChangeQuestion,
  setIsFocused
}) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue(value);
  }, [value])

  const textareaHeight = size => {
    switch (size) {
      case 'large':
        return '50px';
      case 'medium':
        return '21px';
      case 'small':
        return '12px';
      case 'extrasmall':
        return '10px';
      default:
        return '12px';
    }
  }

  useEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = textareaHeight(size);
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue, size])

  const handleOnBlur = () => {
    setIsFocused(false);

    // Check if text-value has changed
    // If changed -> fire handleOnChangeQuestion
    if (value !== textValue) {
      handleOnChangeQuestion(target, textValue)
    }
  }

  return (
    <FormInputTextarea
      ref={textareaRef}
      size={size}
      value={textValue}
      placeholder={placeholder}
      onChange={e => setTextValue(e.target.value)}
      onFocus={e => setIsFocused(true)}
      onBlur={e => handleOnBlur()}
    />
  )
}

const FormInputTextarea = styled.textarea`
  resize: none;
  font-size: ${props => {
    switch(props.size) {
      case 'large':
        return '32px';
      case 'medium':
        return '16px';
      case 'small':
        return '14px';
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

export default FormTextarea