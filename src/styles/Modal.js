import styled from 'styled-components';

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  transition: opacity 0.05s cubic-bezier(0.4,0.0,0.2,1);
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 500;
  background-color: rgba(0,0,0,0.5);
`

const ModalContainer = styled.div`
  margin-top: 50px;
  height: 300px;
  max-width: 590px;
  width: 590px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  color: #202124;
  fill: #5F6368;
`

const ModalTitleRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(228,228,228);
`

const ModalTitle = styled.p`
  margin: 0;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 18px 24px 16px 24px;
  min-width: 0;
  word-wrap: break-word;
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
`

const ModalIcon = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  margin-right: 4px;
  margin-top: 4px;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const ModalContent = styled.div`
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 18px;
`

const ModalContentTitle = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
  color: #202124;
`

const ModalContentLink = styled.div`
  & > input {
    font-family: Roboto,Arial,sans-serif;
    font-weight: 400;
    letter-spacing: .2px;
    color: #202124;
    width: 100%;
    box-sizing: border-box;
    border: none;
    width: 100%;
    outline: none;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    padding: 6px 0;
    cursor: pointer;
  }
`

const ModalContentCaption = styled.p`
  width: 100%;
  font-weight: 400;
  letter-spacing: .2px;
  color: #202124;
  font-size: 12px;
  color: blue;
`

export {
  ModalBackground,
  ModalContainer,
  ModalTitleRow,
  ModalTitle,
  ModalIcon,
  ModalContent,
  ModalContentTitle,
  ModalContentLink,
  ModalContentCaption
}