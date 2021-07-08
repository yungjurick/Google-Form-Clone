import styled from 'styled-components';

const FormQuestionWrapper = styled.div`
  padding: 22px 0 0 0;
  border: 1px solid #dadce0;
  border-radius: 8px;
  width: 100%;
  background-color: #fff;
  position: relative;
  min-height: 100px;
  box-shadow: ${props => props.isActive ? '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)' : 'none'};
  transition: box-shadow 280ms cubic-bezier(0.4,0.0,0.2,1);
  & + & {
    margin-top: 12px;
  }
`

const FormQuestionLeftBorder = styled.div`
  height: ${props => props.isTitleAndDescription ? 'calc(100% + -8px)' : '100%'};
  left: -1px;
  padding-right: 5px;
  position: absolute;
  bottom: -1px;
  width: 6px;
  background-color: #4285f4;
  border-bottom-left-radius: 8px;
  border-top-left-radius: ${props => props.isTitleAndDescription ? '0' : '8px'};
`

const FormQuestionTopBorder = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  position: absolute;
  top: -1px;
  width: calc(100% + 2px);
  background-color: rgb(219, 68, 55);
`

const QuestionStaticWrapper = styled.div`
  padding: 0 24px 24px 24px;
`

const Title = styled.p`
  font-size: ${props => props.primary ? '32px' : '16px'};
  letter-spacing: .1px;
  line-height: ${props => props.primary ? '135%' : '24px'};
  font-weight: 400;
  padding-bottom: 8px;
  margin: ${props => props.primary ? '8px 0 0 0' : '0'};
  & > span {
    color: #d93025;
    margin-right: 24px;
    padding-left: .25em;
  };
`;
const Subtitle = styled.p`
  font-size: ${props => props.primary ? '14px' : '12px'};
  font-weight: 400;
  letter-spacing: ${props => props.primary ? '0.2px' : '0.3px'};
  line-height: ${props => props.primary ? '20px' : '16px'};
  color: ${props => props.light ? '#70757a' : '#202124'};
  margin: 0;
  padding-bottom: 8px;
`;
const OptionsList = styled.div``;
const OptionsItem = styled.div`
  display: flex;
  align-items: center;
`;
const OptionsItemText = styled.p`
  font-family: Roboto,Arial,sans-serif;
  font-weight: 400;
  letter-spacing: .2px;
  color: #202124;
  line-height: 135%;
  font-size: 14px;
  margin-left: 8px;
  padding-bottom: 2px;
`;

const TextResponse = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #202124;
  border-bottom: 1px dotted rgba(0,0,0,0.38);
  padding: 1.75px 0;
  width: ${props => props.long ? '85%' : '40%'};
  margin: 16px 0 8px 0;
`

export {
  FormQuestionWrapper,
  FormQuestionLeftBorder,
  FormQuestionTopBorder,
  QuestionStaticWrapper,
  Title,
  Subtitle,
  OptionsList,
  OptionsItem,
  OptionsItemText,
  TextResponse
}