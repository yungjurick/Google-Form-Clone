import React from 'react';
import styled from 'styled-components';
import { MdAddCircleOutline } from 'react-icons/md';
import Button from '../Common/Button';

const FormSidePanel = ({ onClickPanelButton }) => {
  const handleAddQuestion = () => {
    onClickPanelButton('add')
  }

  return (
    <SidePanelWrapper>
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
  transition: box-shadow 280ms cubic-bezier(0.4,0.0,0.2,1);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  top: 0;
  right: -62px;
  padding: 6px 0;
`

const SidePanelButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  cursor: pointer;
`

export default FormSidePanel