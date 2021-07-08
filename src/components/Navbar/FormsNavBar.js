import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { MdInsertDriveFile, MdAccountCircle } from 'react-icons/md';

const FormsNavBar = () => {
  const { push } = useHistory();
  const { formUid } = useParams();
  const location = useLocation();
  const splitPath = location.pathname.split('/');
  const formStatus = splitPath[splitPath.length - 1];

  const saveFormStatus = useSelector(state => state.form.saveFormStatus);
  const [saveStatus, setSaveStatus] = useState('');

  const saveStatusType = {
    0: '',
    1: 'Saving...',
    2: 'All changes have been saved.'
  }

  useEffect(() => {
    setSaveStatus(saveStatusType[saveFormStatus])
  }, [saveFormStatus])

  const onClickTab = (status, formUid) => {
    push(`/forms/${formUid}/${status}`)
  }

  return (
    <NavBarContainer>
      <NavBarRow>
        <NavBarTitleContainer>
          <NavBarTitle onClick={e => push('/forms/')}>
            <MdInsertDriveFile size="2.8em" color="rgb(217, 61, 46)"/>
            <NavBarTitleText>
              G-ooo-gle Form
            </NavBarTitleText>
          </NavBarTitle>
          <span>{saveStatus}</span>
        </NavBarTitleContainer>
        <NavBarUserContainer>
          <ProfileContainer>
            <MdAccountCircle size="2em" color="rgb(217, 61, 46)"/>
          </ProfileContainer>
          <div></div>
        </NavBarUserContainer>
      </NavBarRow>
      {
        formUid &&
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
      }
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
  align-items: center;
  justify-content: ${props => props.center ? 'center' : 'space-between'};
  padding: 0 26px;
`

const NavBarTitleContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  & > span {
    padding-top: 6px;
    font-weight: 400;
    letter-spacing: .3px;
    line-height: 16px;
    color: #5f6368;
    cursor: default;
    margin: 0 16px;
    min-width: 80px;
    width: 160px;
    font-family: Roboto,Arial,sans-serif;
    font-size: 12px;
  }
`

const NavBarTitle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const NavBarUserContainer = styled.div`
  position: relative;
  cursor: pointer;
  & > div:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 45px;
    width: 45px;
    border-radius: 50%;
    transition: 0.3s all;
  }
  &:hover {
    & > div:last-child {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavBarTitleText = styled.p`
  font-size: 18px;
  padding-top: 2px;
  padding-left: 4px;
  color: #5f6368;
  font-family: 'Product Sans',Arial,sans-serif;
  font-size: 22px;
  line-height: 24px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.5px;
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