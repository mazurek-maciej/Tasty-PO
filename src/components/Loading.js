import React from 'react';
import styled from 'styled-components';
import loadingAnimation from '../utils/spinner.gif';

const LoadingWraper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loading = () => (
    <LoadingWraper>
        <img src={loadingAnimation} alt="loading"/>
    </LoadingWraper>
);
export default Loading;