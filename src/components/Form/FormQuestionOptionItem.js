import React, { Fragment } from 'react';
import styled from 'styled-components';
import { uuid as newUid } from 'uuidv4'

import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank, MdClose } from 'react-icons/md';
import FormEditQuestionInput from './FormEditQuestionInput';

const FormQuestionOptionItem = ({
  type,
  option,
  handleOnChangeQuestion,
  isExtra = false,
  showDelete = false,
  handleAddOption,
  handleDeleteOption
}) => {
  const { uuid, label} = option;

  const handleOnChangeOption = (data) => {
    handleOnChangeQuestion(uuid, data);
  }

  const addNewOption = () => {
    const newOption = {
      uuid: newUid(),
      label: ''
    }

    handleAddOption(newOption);
  }

  return (
    <OptionItem showDelete={showDelete}>
      {
        !isExtra &&
        <Fragment>
          <OptionItemWrapper>
            {type === 'radio' && <MdRadioButtonUnchecked size="1.4em" color="rgba(0,0,0,0.26)"/>}
            {type === 'checkbox' && <MdCheckBoxOutlineBlank size="1.4em" color="rgba(0,0,0,0.26)"/>}
            <FormEditQuestionInput
              size="small"
              target="label"
              value={label}
              handleOnChangeQuestion={handleOnChangeOption}
            />
          </OptionItemWrapper>
          {showDelete && <MdClose size="1.4em" color="rgba(0,0,0,0.6)" onClick={e => handleDeleteOption(uuid)} />}
        </Fragment>
      }
      {
        isExtra &&
        <Fragment>
          {type === 'radio' && <MdRadioButtonUnchecked size="1.4em" color="rgba(0,0,0,0.26)"/>}
          {type === 'checkbox' && <MdCheckBoxOutlineBlank size="1.4em" color="rgba(0,0,0,0.26)"/>}
          <OptionItemExtra onClick={e => addNewOption()}>
            <p>Add Option</p>
          </OptionItemExtra>
        </Fragment>
      }
      
    </OptionItem>
  )
}

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.showDelete ? 'space-between' : 'flex-start'};
  height: 48px;
  & > svg {
    cursor: pointer;
  }
`
const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`

const OptionItemExtra = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 14px;
  margin-left: 10px;
  padding: 2px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  & > p {
    display: inline-block;
    color: rgba(0,0,0,0.54);
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid rgba(0,0,0,0.12);
    }
  }
`

export default FormQuestionOptionItem