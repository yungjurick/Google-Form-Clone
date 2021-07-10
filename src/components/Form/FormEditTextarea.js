import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FormEditTextarea = ({
  target,
  size,
  value,
  placeholder,
  handleOnChangeQuestion,
  addNewOption = () => {},
  setIsFocused
}) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState(' ');

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

  const handleOnBlur = e => {
    setIsFocused(false);

    // [Processing additional case of form-title]
    // When the title is default-title and user onBlurs input after deleting the default-title,
    // the problem was that since redux holds the same value -> it does not recognize as an update
    // - (Since there is no change in the state/props)
    // So -> manually setting the textvalue for this case.
    if (
      target === 'title' &&
      value === 'No Named Form' &&
      textValue === ''
    ) {
      return setTextValue(value);
    }

    // Check if text-value has changed
    // If changed -> fire handleOnChangeQuestion
    if (value !== textValue) {
      return handleOnChangeQuestion(target, textValue);
    }
  }


  // Clear entry with Escape Key
  const handleKeyDown = (key) => {
    console.log(target);
    console.log(key);
    // ESC Key Press to clear out field
    if (key === 'Escape') {
      setTextValue('');
    }

    // Tab Key Press (for option item) to add new option
    if (key === 'Tab' && target === 'label') {
      addNewOption(key);
    }
  }


  return (
    <FormInputTextarea
      ref={textareaRef}
      size={size}
      value={textValue}
      placeholder={placeholder}
      onKeyDown={e => handleKeyDown(e.key)}
      onChange={e => setTextValue(e.target.value)}
      onFocus={e => setIsFocused(true)}
      onBlur={e => handleOnBlur(e)}
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

export default FormEditTextarea