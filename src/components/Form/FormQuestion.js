import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';

import FormInput from './FormInput';

const FormQuestion = ({ isActive, isTitleAndDescription = false }) => {

  // Form Input Logic
  const textareaRef = useRef(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');


  const handleOnChangeText = (target, e) => {
    switch (target) {
      case 'title':
        setTitle(e.target.value);
        return;
      case 'subtitle':
        setSubtitle(e.target.value);
        return;
      default:
        return
    }
  }

  return (
    <FormQuestionWrapper>
      { isTitleAndDescription && (
        <Fragment>
          <FormInput
            size="large"
            value={title}
            target="form-title"
            handleOnChangeText={handleOnChangeText}
          />
          <FormInput
            size="medium"
            value={subtitle}
            target="form-subtitle"
            handleOnChangeText={handleOnChangeText}
          />
          <FormQuestionTopShadow/>
        </Fragment>
      )}
      { isActive && <FormQuestionLeftShadow/>}
    </FormQuestionWrapper>
  )
}

const FormQuestionWrapper = styled.div`
  padding: 22px 24px 24px 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  width: 100%;
  background-color: #fff;
  position: relative;
  min-height: 100px;
`

const FormQuestionLeftShadow = styled.div`
  height: ${props => props.isTitleAndDescription ? '100%' : 'calc(100% + -8px)'};
  left: -1px;
  padding-right: 5px;
  position: absolute;
  bottom: -1px;
  width: 6px;
  background-color: #4285f4;
  border-bottom-left-radius: 8px;
`

const FormQuestionTopShadow = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  position: absolute;
  top: -1px;
  width: calc(100% + 2px);
  background-color: rgb(219, 68, 55);
`

export default FormQuestion;