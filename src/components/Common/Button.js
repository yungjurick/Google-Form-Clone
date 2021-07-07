import React, { useState } from 'react';
import styled from 'styled-components';

const Button = ({
  size,
  label,
  tooltipLocation,
  imgComponent,
  onClickHandler
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ButtonWrapper
      onClick={e => onClickHandler()}
      onMouseEnter={e => setIsHovered(true)}
      onMouseLeave={e => setIsHovered(false)}
      size={size}
    >
      {imgComponent}
      <ButtonBackground
        size={size}
        isHovered={isHovered}
      />
      {
        tooltipLocation === 'right' &&
        <ButtonTooltipRight isHovered={isHovered}>
          <p>{label}</p>
        </ButtonTooltipRight>
      }
      {
        tooltipLocation === 'bottom' &&
        <ButtonTooltipBottom isHovered={isHovered}>
          <p>{label}</p>
        </ButtonTooltipBottom>
      }
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => {
    switch(props.size) {
      case 'medium':
        return '48px';
      case 'small':
        return '36px';
      default:
        return '24px';
    }
  }};
  width: ${props => {
    switch(props.size) {
      case 'medium':
        return '48px';
      case 'small':
        return '36px';
      default:
        return '24px';
    }
  }};
`
const ButtonBackground = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  height: ${props => {
    switch(props.size) {
      case 'medium':
        return '42px';
      case 'small':
        return '30px';
      default:
        return '22px';
    }
  }};
  width: ${props => {
    switch(props.size) {
      case 'medium':
        return '42px';
      case 'small':
        return '30px';
      default:
        return '22px';
    }
  }};
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: ${props => props.isHovered ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0)'};
  transition: 0.3s all;
`

const ButtonTooltip = styled.div`
  position: absolute;
  width: auto;
  display: ${props => props.isHovered ? 'block' : 'none'};
  padding: 4px;
  background-color: black;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.6);
  & > p {
    font-size: 8px;
    color: white;
    margin: 0;
    padding: 0;
  }
`

const ButtonTooltipRight = styled(ButtonTooltip)`
  right: -80px;
`

const ButtonTooltipBottom = styled(ButtonTooltip)`
  left: 50%;
  transform: translateX(-50%);
  bottom: -18px;
`

export default Button;