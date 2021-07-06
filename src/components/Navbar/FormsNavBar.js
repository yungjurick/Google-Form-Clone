import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'

const FormsNavBar = () => {
  const { push } = useHistory();
  const { formUid } = useParams();
  const location = useLocation();
  const splitPath = location.pathname.split('/');
  const formStatus = splitPath[splitPath.length - 1];

  const onClickTab = (status, formUid) => {
    push(`/forms/${formUid}/${status}`)
  }

  return (
    <NavBarContainer>
      <NavBarRow></NavBarRow>
      <NavBarRow center>
        <NavBarTabContainer>
          <NavBarTabList>
            <NavBarTab
              selected={formStatus === 'edit'}
              onClick={() => onClickTab('edit', formUid)}
            >
              Question
            </NavBarTab>
            <NavBarTab
              selected={formStatus === 'response'}
              onClick={() => onClickTab('response', formUid)}
            >
              Response
            </NavBarTab>
            <NavBarTabShadow activeStatus={formStatus}/>
          </NavBarTabList>
        </NavBarTabContainer>
      </NavBarRow>
      <NavBarContainerShadow />
    </NavBarContainer>
  )
}

const NavBarContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #dadce0;
`

const NavBarContainerShadow = styled.div`
  position: absolute;
  bottom: -6px;
  height: 6px;
  background-image: linear-gradient(to bottom,rgba(0,0,0,0.1),transparent);
  opacity: 0;
  width: 100%;
`

const NavBarRow = styled.div`
  width: 100%;
  display: flex;
  align-items:c enter;
  justify-content: ${props => props.center ? 'center' : 'space-between'};
`

const NavBarTabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavBarTabList = styled.div`
  position: relative;
`

const NavBarTab = styled.div`
  padding: 0 12px;
  display: inline-block;
  white-space: nowrap;
  font-size: 14px;
  line-height: 36px;
  font-weight: 500;
  transition: 0.5s all;
  color: ${props => props.selected ? 'rgb(217, 61, 46)' : 'black'};
  cursor: pointer;
`

const NavBarTabShadow = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: ${props => props.activeStatus === 'edit' ? '57px' : '64px'};
  left: 12px;
  transition: 0.5s all;
  transform: ${props => props.activeStatus === 'edit' ? 'translateX(0)' : 'translateX(80px)'};
  /* width: ${props => props.activeStatus === 'edit' ? '57px' : '64px'};
  left: ${props => props.activeStatus === 'edit' ? '12px' : '92px'}; */
  background-color: rgb(217, 61, 46);
`

export default FormsNavBar