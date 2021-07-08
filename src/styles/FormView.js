import styled from 'styled-components';

import {
  FormQuestionWrapper,
  QuestionStaticWrapper,
  Title,
  Subtitle
} from './FormQuestion';

const FormViewLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(250,227,225);
`

const FromViewContainer = styled.div`
  margin: auto;
  max-width: 90vw;
  width: 640px;
  padding: 12px 0;
`

const FormViewRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > p, span {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .3px;
    line-height: 16px;
    color: rgba(0,0,0,0.66);
  }
  & > span {
    margin-top: 8px;
  }
  & > p {
    text-align: center;
    margin: 16px 0;
    width: 100%;
  }
`

const FormViewBottomTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 22.1px;
  position: relative;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: rgba(0,0,0,0.36);
  letter-spacing: -0.5px;
`

const FormViewButton = styled.button`
  margin-top: 12px;
  margin-bottom: 10px;
  outline: none;
  border: none;
  padding: 0 24px;
  color: white;
  background-color: rgb(219,69,55);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .25px;
  line-height: 36px;
`

const FormViewQuestionContent = styled(FormQuestionWrapper)`
  padding: 0;
  min-height: 0;
  border: ${props => props.isErrorActive ? '1px solid #d93025' : '1px solid #dadce0'};
`

const FormViewQuestionWrapper = styled(QuestionStaticWrapper)`
  height: 100%;
  padding: ${props => props.formTitle ? '22px 24px 24px 24px' : '24px'};
`

const FormViewQuestionHeader = styled.div`
  margin-bottom: 16px;
`

const FormViewTitle = styled(Title)`
  padding: 0;
  margin: 0;
  & > span {
    font-size: 16px;
    color: #d93025;
    margin-right: 24px;
    padding-left: .25em;
  }
`
const FormViewSubtitle = styled(Subtitle)`
  margin: ${props => props.primary ? '12px 0 0 0' : '4px 0 0 0'};
  padding: 0;
  white-space: pre-wrap;
  color: ${props => {
    if (props.red) {
      return '#d93025'
    } else if (props.link) {
      return '#1a73e8;'
    } else {
      return '#202124'
    }
  }};
  cursor: ${props => props.link ? 'pointer' : 'normal'};
  text-decoration: ${props => props.link ? 'underline' : 'none'};
`

const FormViewQuestionError = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 12px;
  & > span {
    height: 100%;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .3px;
    line-height: 16px;
    color: #d93025;
    margin-left: 12px;
  }
`

export {
  FormViewLayout,
  FromViewContainer,
  FormViewRow,
  FormViewBottomTitle,
  FormViewButton,
  FormViewQuestionContent,
  FormViewQuestionWrapper,
  FormViewQuestionHeader,
  FormViewTitle,
  FormViewSubtitle,
  FormViewQuestionError
}