import React from 'react';
import styled, { keyframes } from 'styled-components';

const FormViewOptionResponse = ({
  questionType,
  questionUid,
  questionOptions,
  response,
  onChangeResponse
}) => {
  const handleChangeOption = (optionUid, arr) => {
    let temp = [];

    if (questionType === 'checkbox') {
      const index = arr.findIndex(r => r === optionUid);
      if (index === -1)  {
        temp = [...response]
        temp.push(optionUid);
      } else if (index > -1) {
        temp = [...response].filter(r => r !== optionUid);
      }
    }

    if (questionType === 'radio') {
      temp = [optionUid];
    }
    
    onChangeResponse(questionUid, temp);
  }

  const isChecked = (optionUid, arr) => arr.findIndex(r => r === optionUid) > -1;

  return questionOptions.map(option => {
    return (
      <OptionResponse key={option.uuid}>
        <RadioIcon
          onClick={e => handleChangeOption(option.uuid, response)}
        >
          <RadioIconInk />
          <RadioIconCircles
            checked={isChecked(option.uuid, response)}
          >
            <div/>
          </RadioIconCircles>
        </RadioIcon>
        <FormViewOptionLabel>
          <span>
            {option.label}
          </span>
        </FormViewOptionLabel>
      </OptionResponse>
    )
  })
}

const OptionResponse = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const FormViewOptionLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  & > span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #202124;
  }
`

const RadioIcon = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Flicker = keyframes`
  from { transform: translate(-50%, -50%) scale(0) }
  to { transform: translate(-50%, -50%) scale(1) }
`

const RadioIconInk = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    background-color: rgb(219,69,55, 0.15);
  }
  &:active {
    animation: ${Flicker} 0.28s ease;
  }
`

const RadioIconCircles = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 2px;
  transition: border-color ease .28s;
  border-color: ${props => props.checked ? 'rgb(219,69,55)' : '#5f6368'};
  position: relative;
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: transform ease .28s;
    transform: ${props => props.checked ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'};
    border: 5px solid;
    border-color: rgb(219,69,55);
    border-radius: 50%;
  }
`

export default FormViewOptionResponse;