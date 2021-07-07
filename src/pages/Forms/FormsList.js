import React, { useState } from 'react';
import styled from 'styled-components';

import FormsNavBar from '../../components/Navbar/FormsNavBar';

const sampleData =[
  {
    formUid: '123',
    title: 'asd'
  }
]

const FormsList = () => {
  return (
    <Layout>
      <FormsNavBar />
      <Container>
        <ContainerTitle>
          My Forms
        </ContainerTitle>
      </Container>
    </Layout>

  )
}

const Layout = styled.div`
  min-height: 100vh;
  width: 100vw;
`

const Container = styled.div`
  width: 700px;
  margin: 0 auto;
`
const ContainerTitle = styled.p`
  margin: 0;
  padding: 21px 0 19px;
`

export default FormsList