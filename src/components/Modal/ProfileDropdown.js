import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { firebaseApp } from '../../firebase';
import { userLogOut } from '../../reducers';

const ProfileDropdown = ({
  profileUrl,
  nickname
}) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const onImageError = img => {
    img.onerror = '';
    img.src = 'https://gravatar.com/avatar/f414c13ace4f77f9dbc7c609c78dafc3?s=400&d=identicon&r=x';
    return true;
  }

  const handleLogout = () => {
    push('/');
		firebaseApp.auth().signOut()
		dispatch(userLogOut());
  }

  return (
    <ProfileCard>
      <Profile>
        <img
          src={profileUrl}
          alt="profile"
          onError={e => onImageError(this)}
        />
        <ProfileName>
          {nickname}
        </ProfileName>
      </Profile>
      <ProfileCardRow>
        <ProfileCardButton onClick={e => handleLogout()}>
          Logout
        </ProfileCardButton>
      </ProfileCardRow>
    </ProfileCard>
  )
}

const ProfileCard = styled.div`
  max-height: calc(100vh - 62px - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 354px;
  border-radius: 8px;
  z-index: 991;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-color: rgba(0,0,0,.2);
  color: #000;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  right: 8px;
  top: 62px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  & > img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  border-bottom: 1px solid #e8eaed;
`
const ProfileName = styled.p`
  color: #202124;
  font: 500 16px/22px Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  letter-spacing: 0.29px;
  margin: 0;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`
const ProfileCardRow = styled.div`
  border-bottom: 1px solid #e8eaed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`
const ProfileCardButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  display: inline-block;
  font: 500 14px/16px Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  letter-spacing: .15px;
  margin: 16px;
  outline: 0;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  white-space: normal;
  cursor: pointer;
  &:hover {
    background-color: #e8eaed;
  }
`

export default ProfileDropdown;