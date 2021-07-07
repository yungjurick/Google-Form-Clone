import styled from 'styled-components';

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
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: ${props => props.primary ? '#202124' : '#70757a'};
  margin: 0;
  padding-bottom: 16px;
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
  margin: 14px 0 8px 0;
`

export {
  QuestionStaticWrapper,
  Title,
  Subtitle,
  OptionsList,
  OptionsItem,
  OptionsItemText,
  TextResponse
}