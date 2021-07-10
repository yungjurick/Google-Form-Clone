import React from 'react';
import styled from 'styled-components';

const FormsResponses = ({}) => {
  return (
    <FormResponsesLayout>
      <FormResponsesContainer>

      </FormResponsesContainer>
    </FormResponsesLayout>
  )
}

const FormResponsesLayout= styled.div`
  width: 100%;
  height: 100%;
  padding-top: 14px;
`

const FormResponsesContainer = styled.div`
  width: 50%;
  margin: auto;
  padding-bottom: 64px;
  position: relative;
  max-width: 90vw;
  width: 770px;
`

export default FormsResponses