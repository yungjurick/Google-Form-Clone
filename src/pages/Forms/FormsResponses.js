import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FormsResponses = () => {
  const form = useSelector(state => state.form.form);
  const formResponses = useSelector(state => state.form.formResponses);

  const [responses, setResponses] = useState({});

  useEffect(() => {
    const responseObj = {}

    form.questions.forEach(q => {
      responseObj[q.uuid] = {
        title: q.title,
        questionType: q.questionType,
        count: 0
      }

      if (q.questionType === 'radio' || q.questionType === 'checkbox') {
        responseObj[q.uuid]['options'] = {}
        q.options.forEach(o => {
          responseObj[q.uuid]['options'][o.uuid] = {
            title: o.label,
            count: 0
          }
        })
      } else {
        responseObj[q.uuid]['responses'] = []
      }
    })

    if (formResponses && formResponses.length > 0) {
      formResponses.forEach(({ responses }) => {
        console.log(responses);
        const questionUids = Object.keys(responses);

        questionUids.forEach(uid => {
          if (uid in responseObj) {
            responseObj[uid]['count'] += 1;

            if (
              responseObj[uid].questionType === 'radio' ||
              responseObj[uid].questionType === 'checkbox'
            ) {
              responses[uid].forEach(optionUid => {
                if (optionUid in responseObj[uid]['options']) {
                  responseObj[uid]['options'][optionUid]['count'] += 1;
                }
              })
            } else {
              responseObj[uid]['responses'].push(responses[uid]);
            }
          }
        })
      })
    }

    console.log(responseObj);
    setResponses(responseObj)

  }, [form.questions, formResponses])

  const responseContent = (questionUid, responsesObj) => {
    if (questionUid in responsesObj && responsesObj[questionUid].count > 0) {
      if (
        responsesObj[questionUid]['questionType'] === 'radio' ||
        responsesObj[questionUid]['questionType'] === 'checkbox'
      ) {
        return (
          <ResponseOptionTable>
            <thead>
              <tr>
                <th>Option ({responsesObj[questionUid]['questionType']})</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(responsesObj[questionUid]['options']).map(optionUid => {
                  return (
                    <tr key={optionUid}>
                      <td>{responsesObj[questionUid]['options'][optionUid].title}</td>
                      <td>{responsesObj[questionUid]['options'][optionUid].count}</td>
                      <td>
                        {
                          Math.round(
                            (responsesObj[questionUid]['options'][optionUid].count / responsesObj[questionUid].count) * 100
                          )
                        }%
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </ResponseOptionTable>
        )
      } else {
        return responsesObj[questionUid]['responses'].map((r, i) => (
          <ResponseText key={i}>{r}</ResponseText>
        ))
      }
    } else {
      return (
        <ResponseText noResponse>
          There are no responses for this question.
        </ResponseText>
      )
    }
  }

  return (
    <FormResponsesLayout>
      <FormResponsesContainer>
        <ResponseList>
          <Response>
            <ResponseTitle header>
              {formResponses.length || 0} Responses
            </ResponseTitle>
          </Response>
          {
            form.questions.map((q, i) => {
              return (
                <Response
                  key={i}
                >
                  <ResponseTitle>
                    {q.title}
                  </ResponseTitle>
                  <ResponseSubtitle>
                  {responses[q.uuid]?.count || 0} Responses
                  </ResponseSubtitle>
                  <ResponseContent>
                    {responseContent(q.uuid, responses)}
                  </ResponseContent>
                </Response>
              )
            })
          }
        </ResponseList>
      </FormResponsesContainer>
    </FormResponsesLayout>
  )
}

const FormResponsesLayout= styled.div`
  width: 100%;
  height: 100%;
  padding-top: 14px;
`

const FormResponsesContainer = styled.div`
  width: 50%;
  margin: auto;
  padding-bottom: 64px;
  position: relative;
  max-width: 90vw;
  width: 770px;
`

const ResponseList = styled.div`
  width: 100%;
`

const Response = styled.div`
  width: 100%;
  padding: 12px 24px;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  & + & {
    margin-top: 12px;
  }
`

const ResponseTitle = styled.div`
  font-size: ${props => props.header ? '28px' : '16px'};
  font-weight: 400;
  letter-spacing: ${props => props.header ? '0.3px' : '0.1px'};
  color: #202124;
`

const ResponseSubtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: #202124;
  padding-top: 8px;
  margin: 0;
`

const ResponseContent = styled.div`
  width: 100%;
  padding-top: 20px;
`

const ResponseText = styled.p`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #202124;
  background-color: ${props => props.noResponse ? '#fff' : '#f8f9fa'};
  border-radius: 4px;
  margin: 0;
  padding: ${props => props.noResponse ? '0px' : '10px'};
  & + & {
    margin-top: 4px;
  }
`

const ResponseOptionTable = styled.table`
  width: 100%;
  border-spacing: 1px;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #f8f9fa;
  font-size: 14px;
  letter-spacing: .2px;
  color: #202124;
  th, td {
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: 400;
  }
  thead {
    background-color: #f8f9fa;
  }
`

export default FormsResponses