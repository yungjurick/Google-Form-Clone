import React from 'react';
import styled from 'styled-components';
import { MdAddCircleOutline } from 'react-icons/md';
import Button from '../Common/Button';

const FormSidePanel = ({ topValue, onClickPanelButton }) => {
  const handleAddQuestion = () => {
    onClickPanelButton('add')
  }

  return (
    <SidePanelWrapper topValue={topValue}>
      <Button
        size="small"
        label="Add Question"
        tooltipLocation="right"
        imgComponent={<MdAddCircleOutline size="24px" color="rgb(0, 0, 0, 0.65)" />}
        onClickHandler={handleAddQuestion}
      />
    </SidePanelWrapper>
  )
}

const SidePanelWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  transition: all 280ms cubic-bezier(0.4,0.0,0.2,1);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  top: 0;
  right: -62px;
  padding: 6px 0;
  transform: ${props => `translateY(${props.topValue}px)`};
  @media (max-width: 380px) {
    z-index: 2;
    width: 100%;
    border-radius: 8px 8px 0 0;
    position: fixed;
    top: calc(100% - 48px);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

export default FormSidePanel