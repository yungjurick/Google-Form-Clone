import { useState } from 'react';
import styled from 'styled-components';

const FormToggle = (({
  isRequired,
  handleOnChangeIsRequired
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <FormToggleLabel>
        <span>Required</span>
      </FormToggleLabel>
      <FormToggleEl
        onClick={e => handleOnChangeIsRequired()}
        onMouseEnter={e => setIsHovered(true)}
        onMouseLeave={e => setIsHovered(false)}
      >
        <FormToggleTrack toggled={isRequired}/>
        <FormToggleInk toggled={isRequired} hovered={isHovered}/>
        <FormToggleCircles toggled={isRequired}>
          <FormToggleThumb toggled={isRequired}/>
        </FormToggleCircles>
      </FormToggleEl>
    </div>
  )
})

const FormToggleLabel = styled.label`
  & > span {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #202124;
    cursor: default;
    margin-right: 12px;
  }
`
const FormToggleEl = styled.div`
  box-sizing: content-box;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  outline: none;
  position: relative;
  vertical-align: middle;
  width: 37px;
  div {
    box-sizing: content-box;
  }
`

const FormToggleTrack = styled.div`
  transition: border-color .3s ease;
  border: 7px solid #b9b9b9;
  border-radius: 7px;
  position: absolute;
  top: 3px;
  width: 23px;
  border-color: ${props => props.toggled ? 'rgba(219,68,55,0.25)' : '#b9b9b9'};
`

const FormToggleInk = styled.div`
  transition: opacity .15s ease, left .3s ease, background-color .3 ease;
  background-color: ${props => props.toggled ? 'rgba(219,68,55,0.5)' : 'rgba(0,0,0,0.2)'};
  border-radius: 100%;
  height: 20px;
  left: ${props => props.toggled ? '17px' : '0'};
  opacity: ${props => props.hovered ? '.1' : '0'};
  outline: .1px solid transparent;
  pointer-events: none;
  position: absolute;
  width: 20px;
  z-index: 0;
  transform: scale(2.0);
`

const FormToggleCircles = styled.div`
  transition: transform .06s ease;
  transform: ${props => props.toggled ? 'translateX(17px)' : '0'};
`

const FormToggleThumb = styled.div`
  transition: border-color .3s ease;
  border: 10px solid #fafafa;
  border-radius: 100%;
  position: absolute;
  box-shadow: 0px 1px 3px rgb(0 0 0 / 40%);
  border-color: ${props => props.toggled ? 'rgb(219,68,55)' : 'white'};
`

export default FormToggle