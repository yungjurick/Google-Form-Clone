import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const Loading = () => {
  const isLoading = useSelector(state => state.loading.isLoading);

	return (
    <LoadingContainer isLoading={isLoading}>
      <Loader />
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${props => props.isLoading ? 'flex' : 'none'};
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: ${spin} 1.5s linear infinite;
`

export default Loading