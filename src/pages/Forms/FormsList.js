import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../reducers/loading';
import { db, firebase } from '../../firebase';
import { MdInsertDriveFile, MdDeleteForever } from 'react-icons/md';

import FormsNavBar from '../../components/Navbar/FormsNavBar';
import { uuid } from 'uuidv4';
import { setSaveFormKey, setSaveFormStatus } from '../../reducers/form';
import { setProfileDropdownStatus } from '../../reducers/modal';

const FormsList = () => {
  const { uid: userUid } = useSelector(state => state.user.userProfile);
  const isProfileDropdownOpen = useSelector(state => state.modal.isProfileDropdownOpen);
  const [forms, setForms] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const convertTimestampToDate = timestamp => {
    const date = new Date(timestamp*1000).toDateString().split(' ');
    const time = new Date(timestamp*1000).toLocaleTimeString().split(':');
  
    return `${date[1]} ${date[2]}, ${time[0]}:${time[1]}`
  }

  const createDefaultForm = (creatorUid) => {
    return {
      uuid: uuid(),
      creatorUid,
      title: 'No Title Form',
      subtitle: '',
      questions: [],
      createdAt: firebase.firestore.Timestamp.now().seconds,
      lastUpdated: firebase.firestore.Timestamp.now().seconds
    }
  }

  const addNewForm = async (creatorUid) => {
    dispatch(setLoading(true));
    // Update State
    const tempForms = [...forms];
    const defaultForm = createDefaultForm(creatorUid);
    tempForms.push(defaultForm);
    setForms(tempForms);

    // Update Firestore
    // - Add New Form Doc
    await db
      .collection('forms')
      .doc(defaultForm.uuid)
      .set(defaultForm)

    dispatch(setLoading(false));
  }

  const navigateToForm = formUid => {
    history.push(`/forms/${formUid}/edit`);
  }

  // Fetch my forms from firebase
  useEffect(() => {
    const getForms = async () => {
      dispatch(setLoading(true));

      const formsRef = db
        .collection('forms')
        .where('creatorUid', '==', userUid)

      const querySnapshot = await formsRef.get();
      const tempForms = []
      querySnapshot.forEach((doc) => {
        tempForms.push(doc.data());
      })

      setForms(tempForms);
      dispatch(setLoading(false));
    }

    // Reset Save Status & Save Key
    dispatch(setSaveFormStatus(0));
    dispatch(setSaveFormKey(''));

    if (userUid === '') {
      history.push('/')
    } else {
      getForms();
    }
  }, [])

  const checkOpenedModal = () => {
    if (isProfileDropdownOpen) {
      dispatch(setProfileDropdownStatus(false));
    }
  }

  return (
    <Layout>
      <FormsNavBar />
      <Container onClick={e => checkOpenedModal()}>
        <ContainerTitle>
          <p>My Forms</p>
          <div onClick={e => addNewForm(userUid)}>
            Create New Form
          </div>
        </ContainerTitle>
        <List>
          {
            forms.map((form, index) => {
              return (
                <Fragment key={form.uuid}>
                  <ListHorizontalLine />
                  <ListItem>
                    <ListItemWrapper onClick={e => navigateToForm(form.uuid)}>
                      <ListItemIcon>
                        <MdInsertDriveFile size="1.3em" color="rgb(217, 61, 46)"/>
                      </ListItemIcon>
                      <ListItemText>
                        <div>{form.title}</div>
                      </ListItemText>
                      <ListItemSubtext>
                        Last Updated: {convertTimestampToDate(form.lastUpdated)}
                      </ListItemSubtext>
                    </ListItemWrapper>
                    <ListItemOptionIcon>
                      <ListItemOptionIconWrapper>
                        <MdDeleteForever size="1.3em" color="rgb(217, 61, 46)"/>
                      </ListItemOptionIconWrapper>
                    </ListItemOptionIcon>
                  </ListItem>
                  { index === (forms.length - 1) && <ListHorizontalLine />}
                </Fragment>
              )
            })
          }
        </List>
        {
          forms.length === 0 &&
          <ListEmptyText>
            You have no created forms. Create a new form to see the form here.
          </ListEmptyText>
        }
      </Container>
    </Layout>

  )
}

const Layout = styled.div`
  min-height: 100vh;
  width: 100vw;
`

const Container = styled.div`
  min-width: 700px;
  width: 80%;
  margin: 0 auto;
  padding-top: 70px;
  min-height: 100vh;
`
const ContainerTitle = styled.div`
  margin: 0;
  padding: 21px 16px 19px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    border-radius: 8px;
    padding: 4px 12px;
    font-size: 13px;
    background-color: rgba(217, 61, 46, 0.9);
    color: white;
    cursor: pointer;
  }
  & > p {
    margin: 0;
  }
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ListEmptyText = styled.div`
  padding-top: 32px;
  padding-left: 16px;
  font-weight: 600;
`

const ListHorizontalLine = styled.div`
  height: 0;
  border-top: 1px solid #e3e3e3;
  width: 99%;
  margin: 2px 0;
`
const ListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 50px;
  cursor: pointer;
  &:hover {
    background-color: rgba(217, 61, 46, 0.2);
    /* border-top: 1px solid #fff !important; */
    border-radius: 8px;
  }
`
const ListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
const ListItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 14px 12px 16px;
  height: 100%;
  margin-bottom: -1px;
`

const ListItemOptionIcon = styled(ListItemIcon)`
  border: none;
  margin: 0;
  cursor: pointer;
  z-index: 1;
`

const ListItemOptionIconWrapper = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const ListItemText = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
  margin: 0 12px;
  flex: 1;
  font-weight: 500;
  letter-spacing: 0.2px;
  font-size: 14px;
  & > div {
    display: inline-block;
    line-height: 20px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    white-space: nowrap;
  }
`
const ListItemSubtext = styled.p`
  margin: 0;
  color: #5f6368;
  letter-spacing: 0.2px;
  line-height: 20px;
  margin-left: 0px;
  margin-right: 16px;
  font-size: 14px;
`

export default FormsList