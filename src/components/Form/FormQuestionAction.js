import React from 'react';
import styled from 'styled-components';

const FormQuestionAction = ({}) => {
  return (
    <FormQuestionActionContainer>
      <FormQuestionActionItemList>
        <FormQuestionActionButton></FormQuestionActionButton>
        <FormQuestionActionButton></FormQuestionActionButton>
        <FormQuestionHorizontalLine/>
        <FormQuestionActionToggle></FormQuestionActionToggle>
        <FormQuestionActionButton></FormQuestionActionButton>
      </FormQuestionActionItemList>
    </FormQuestionActionContainer>
  )
}

const FormQuestionActionContainer = styled.div`
  height: 64px;
  width: 100%;
  padding: 0 24px;
  /* background-color: blue; */
`

const FormQuestionActionItemList = styled.div`
  height: 100%;
  display: flex;
  border-top: 1px solid #dadce0;
  justify-content: flex-end;
  align-items: center;
`

const FormQuestionActionButton = styled.div``
const FormQuestionHorizontalLine = styled.div``
const FormQuestionActionToggle = styled.div``

export default FormQuestionAction;