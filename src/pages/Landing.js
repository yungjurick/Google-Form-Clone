import React, { useEffect, useState } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { db, firebase, firebaseApp } from '../firebase';
import { setLoading } from '../reducers/loading';
import { setUserProfile } from '../reducers/user';

const Landing = () => {
  const authProvider = new firebase.auth.GoogleAuthProvider();
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = firebaseApp.auth().currentUser;
    if (user !== null) {
      dispatch(setUserProfile({
        uid: user.uid,
        nickname: user.displayName,
        photoUrl: user.photoURL
      }))
      push('/forms/');
    }
  }, [])

  const onLogin = async () => {
    try {
      const result = await firebaseApp.auth().signInWithPopup(authProvider);
      const { displayName, uid, photoURL } = result.user;

      console.log(displayName, uid, photoURL);

      dispatch(setLoading(true));
      const userRef = db.collection('users').doc(uid);
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        const userData = userDoc.data();
        dispatch(setUserProfile(userData))
      } else {
        const newUserData = {
          uid,
          nickname: displayName,
          photoUrl: photoURL
        }
        dispatch(setUserProfile(newUserData));
        await userRef.set(newUserData);
      } 
      dispatch(setLoading(false));
      push('/forms/');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <BaseLayout>
      <BaseCard>
        <BaseCardIcon>
          <MdInsertDriveFile size="8em" color="rgb(217, 61, 46)"/>
        </BaseCardIcon>
        <BaseCardTitle>
          G-ooo-gle Form
        </BaseCardTitle>
        <BaseCardButtonContainer>
          <BaseCardButton onClick={e=>onLogin()}>
            Login using (real) Google
          </BaseCardButton>
        </BaseCardButtonContainer>
        <BaseCardTopShadow/>
      </BaseCard>
      <BaseSubtitle>
        A Google Form Clone Application made using React & Redux
      </BaseSubtitle>
    </BaseLayout>
  )
}

const BaseLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: rgba(250,227,225, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BaseCard = styled.div`
  position: relative;
  padding: 16px;
  border-radius: 8px;
  width: 350px;
  & > p {
    margin: 0;
  }
  background-color: #fff;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`

const BaseCardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`
const BaseCardTitle = styled.p`
  font-size: 32px;
  letter-spacing: 0px;
  line-height: 135%;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  padding: 6px 0;
`
const BaseSubtitle = styled.p`
  width: 350px;
  font-size: 11px;
  border-radius: 4px;
  letter-spacing: -0.5px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 0;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`

const BaseCardTopShadow = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  position: absolute;
  top: -1px;
  width: calc(100% + 2px);
  background-color: rgb(219, 68, 55);
`

const BaseCardButtonContainer = styled.div`
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > button:first-child {
    background-color: rgb(219, 68, 55, 0.9);
  }
`
const BaseCardButton = styled.button`
  flex: 1;
  width: 100%;
  padding: 14px 0;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  letter-spacing: .2px;
  cursor: pointer;
`

export default Landing