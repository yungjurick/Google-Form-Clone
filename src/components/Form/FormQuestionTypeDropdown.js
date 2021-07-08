import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import {
  MdShortText,
  MdSubject,
  MdRadioButtonChecked,
  MdCheckBox,
  MdArrowDropDown
} from 'react-icons/md'
import { uuid } from 'uuidv4';

const FormQuestionTypeDropdown = ({
  isOptionsEmpty,
  questionType,
  handleOnChangeQuestion
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const questionTypeList = [
    {
      type: 'short-answer',
      label: 'Short answer',
    },
    {
      type: 'long-answer',
      label: 'Long answer',
    },
    {
      type: 'radio',
      label: 'Multiple Choice',
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
    }
  ]

  const getTypeLabel = (type) => {
    const filtered = questionTypeList.filter(item => item.type === type);
    return filtered[0].label;
  }

  const createDefaultOption = () => {
    return {
      uuid: uuid(),
      label: 'Option 1'
    }
  }

  const handleOnClickItem = (type, val) => {
    setIsDropdownOpen(false);

    // If same type is clicked, ignore the click
    if (questionType === val) return;

    const tempData = {
      [type]: val
    }

    if ((val === 'radio' || val === 'checkbox') && isOptionsEmpty) {
      const temp = []
      temp.push(createDefaultOption());
      tempData['options'] = temp;
    }

    handleOnChangeQuestion(tempData);
  }

  const selectedTypeIcon = (type) => {
    switch(type) {
      case 'short-answer':
        return <MdShortText size="1.7em"/>
      case 'long-answer':
        return <MdSubject size="1.7em"/>
      case 'radio':
        return <MdRadioButtonChecked size="1.7em"/>;
      case 'checkbox':
        return <MdCheckBox size="1.7em"/>;
      default:
        return;
    }
  }

  return (
    <DropdownWrapper>
      {/* Selected Question Type */}
      <DropdownListItem onClick={e => { setIsDropdownOpen(true);}}>
        <DropdownListItemContent>
          {selectedTypeIcon(questionType)}
          <span>{getTypeLabel(questionType)}</span>
        </DropdownListItemContent>
        <MdArrowDropDown size="1.7em"/>
      </DropdownListItem>

      {/* Question Type Dropdown List */}
      { isDropdownOpen && 
        <DropdownList>
          {
            questionTypeList.map(({ type, label }, index) => {
              if (index === 2) {
                return (
                  <Fragment key={index}>
                    <DropdownListHorizontalLine/>
                    <DropdownListItem
                      isListOpen={isDropdownOpen}
                      isSelected={questionType === type}
                      onClick={e => handleOnClickItem('questionType', type)}
                    >
                      <DropdownListItemContent>
                        {selectedTypeIcon(type)}
                        <span>{label}</span>
                      </DropdownListItemContent>
                    </DropdownListItem>
                  </Fragment>
                )
              } else {
                return (
                  <DropdownListItem
                    key={index}
                    isListOpen={isDropdownOpen}
                    isSelected={questionType === type}
                    onClick={e => handleOnClickItem('questionType', type)}
                  >
                    <DropdownListItemContent>
                      {selectedTypeIcon(type)}
                      <span>{label}</span>
                    </DropdownListItemContent>
                  </DropdownListItem>
                )
              }
            })
          }
        </DropdownList>
      }
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #dadce0;
  margin-left: 35px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 32px;
  color: #202124;
  width: 180px;
  position: relative;
`

const DropdownList = styled.div`
  position: absolute;
  z-index: 10;
  top: -8px;
  left: 0;
  min-width: 190px;
  width: 100%;
  padding: 8px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  & > div {
    padding: 8px;
  }
`

const DropdownListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${props => {
    if (props.isListOpen) {
      return props.isSelected ? 'rgba(26,115,232,0.078)' : 'white';
    } else {
      return 'white';
    }
  }};
  &:hover {
    background-color: ${props => {
      if (props.isListOpen) {
        return props.isSelected ? 'rgba(26,115,232,0.039)' : '#eeeeee';
      } else {
        return 'white';
      }
    }};
  }
`

const DropdownListItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > span {
    margin-left: 10px;
  }
`

const DropdownListHorizontalLine = styled.div`
  width: 100%;
  margin: 8px 0;
  padding: 0 !important;
  border-top: 1px solid rgba(0,0,0,0.12);
`

export default FormQuestionTypeDropdown;