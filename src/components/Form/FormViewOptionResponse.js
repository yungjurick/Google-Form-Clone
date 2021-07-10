import React from 'react';
import styled, { keyframes } from 'styled-components';

const FormViewOptionResponse = ({
  questionType,
  questionUid,
  questionOptions,
  response,
  onChangeResponse,
  isRequired
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

  return (
    <OptionResponseContainer>
      {
        questionOptions.map(option => {
          return (
            <OptionResponse key={option.uuid}>

              <OptionIcon
                onClick={e => handleChangeOption(option.uuid, response)}
              >
                <OptionIconWrapper>
                  <OptionIconInk />
                  {
                    questionType === 'radio' &&
                    <OptionIconCircles
                      checked={isChecked(option.uuid, response)}
                    >
                      <div/>
                    </OptionIconCircles>
                  }
                  {
                    questionType === 'checkbox' &&
                    <OptionIconCheckbox
                      checked={isChecked(option.uuid, response)}
                    >
                      <OptionIconCheckmark>
                        <div/>
                        <div/>
                      </OptionIconCheckmark>
                    </OptionIconCheckbox>
                  }
                </OptionIconWrapper>
              </OptionIcon>

              <FormViewOptionLabel>
                <span>
                  {option.label}
                </span>
              </FormViewOptionLabel>
            </OptionResponse>
          )
        })
      }
      {
        // If it's a required question, deselct functionality is disabled
        !isRequired &&
        <OptionResponseButtonRow>
          <OptionResponseButton
            show={response.length > 0}
            onClick={e => onChangeResponse(questionUid, [])}
          >
            Deselect
          </OptionResponseButton>
        </OptionResponseButtonRow>
      }
    </OptionResponseContainer>
  )
}

const OptionResponseContainer = styled.div`
  width: 100%;
`

const OptionResponseButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`
const OptionResponseButton = styled.div`
  height: ${props => props.show ? '36px' : '0px'};
  overflow: hidden;
  padding: 0 8px;
  transition: height 200ms cubic-bezier(0.4,0.0,0.2,1);
  color: #5f6368;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .25px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

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

const OptionIcon = styled.div`
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

const OptionIconWrapper = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const OptionIconInk = styled.div`
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

const OptionIconCircles = styled.div`
  width: 20px;
  height: 20px;
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

const OptionIconCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  position: relative;
  transition: border-color ease .28s, background-color ease .28s;
  border: solid 2px;
  border-color: ${props => props.checked ? 'rgb(219,69,55)' : '#5f6368'};
  background-color: ${props => props.checked ? 'rgb(219,69,55)' : 'transparent'};
`

const OptionIconCheckmark = styled.div`
  top: 6px;
  left: 7px;
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: 0;
  height: 100%;
  pointer-events: none;
  width: 100%;
  border-color: ${props => props.checked ? 'rgb(219,69,55)' : 'transparent'};

  & > div:first-child {
    width: 2px;
    height: 7px;
    background-color: #fff;
    border-width: 0;
    left: 0;
    position: absolute;
  }
  & > div:last-child {
    width: 13px;
    height: 2px;
    background-color: #fff;
    border-width: 0;
    left: 0;
    position: absolute;
    top: 5px;
  }
`

export default FormViewOptionResponse;