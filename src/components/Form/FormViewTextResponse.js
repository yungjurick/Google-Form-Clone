import React from 'react';
import styled from 'styled-components';

import FormViewInput from './FormViewInput';

const FormViewTextResponse = ({
  questionType,
  questionUid,
  response,
  onChangeResponse,
  isErrorActive
}) => {
  const handleOnChangeText = value => {
    onChangeResponse(questionUid, value);
  }

  return (
    <TextResponse>
      <FormViewInput
        type={questionType}
        value={response}
        handleOnChangeText={handleOnChangeText}
        isErrorActive={isErrorActive}
      />
    </TextResponse>
  )
}

const TextResponse = styled.div`
  display: flex;
  padding-top: 14px;
`

export default FormViewTextResponse;