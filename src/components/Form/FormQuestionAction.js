import React from 'react';
import styled from 'styled-components';
import {
  MdContentCopy,
  MdDelete,
  MdAssignment,
  MdExpandMore,
  MdExpandLess
} from 'react-icons/md';

import FormToggle from './FormToggle';
import Button from '../Common/Button';

const FormQuestionAction = ({
  isRequired,
  handleOnCopyQuestion,
  handleOnDeleteQuestion,
  handleOnChangeSubtitle,
  handleOnChangeIsRequired,
  handleOnMoveQuestion
}) => {
  const onMoveUpQuestion = () => {
    handleOnMoveQuestion('up')
  }

  const onMoveDownQuestion = () => {
    handleOnMoveQuestion('down')
  }

  return (
    <FormQuestionActionContainer>
      <FormQuestionActionItemList>
        <Button
          size="medium"
          label="Move Up"
          tooltipLocation="bottom"
          imgComponent={<MdExpandLess size="1.35em" color="rgb(0, 0, 0, 0.55)" />}
          onClickHandler={onMoveUpQuestion}
        />
        <Button
          size="medium"
          label="Move Down"
          tooltipLocation="bottom"
          imgComponent={<MdExpandMore size="1.35em" color="rgb(0, 0, 0, 0.55)" />}
          onClickHandler={onMoveDownQuestion}
        />
        <FormQuestionHorizontalLine/>
        <Button
          size="medium"
          label="Copy"
          tooltipLocation="bottom"
          imgComponent={<MdContentCopy size="1.35em" color="rgb(0, 0, 0, 0.55)" />}
          onClickHandler={handleOnCopyQuestion}
        />
        <Button
          size="medium"
          label="Delete"
          tooltipLocation="bottom"
          imgComponent={<MdDelete size="1.35em" color="rgb(0, 0, 0, 0.55)" />}
          onClickHandler={handleOnDeleteQuestion}
        />
        <Button
          size="medium"
          label="Subtitle"
          tooltipLocation="bottom"
          imgComponent={<MdAssignment size="1.35em" color="rgb(0, 0, 0, 0.55)" />}
          onClickHandler={handleOnChangeSubtitle}
        />
        <FormQuestionHorizontalLine/>
        <FormToggle
          isRequired={isRequired}
          handleOnChangeIsRequired={handleOnChangeIsRequired}
        />
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

const FormQuestionHorizontalLine = styled.div`
  border-left: 1px solid #dadce0;
  height: 32px;
  margin: 0 16px;
  width: 0;
`

export default FormQuestionAction;