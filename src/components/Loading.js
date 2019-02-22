import React from 'react';
import styled, {keyframes} from 'styled-components';

const LoadingWraper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.1
  }
  100% {
    transform: rotate(360deg);
    opacity: 1
  }
`;

const SpiningBlock = styled.div`
  animation: ${Spin} ${props => props.delay} linear infinite;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  ::before {
    border: solid 3px #eee;
    border-bottom-color: #ef6565;
    border-top-color: #ef6565;
    border-radius: 50%;
    content: '';
    height: 150px;
    width: 150px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
`;

const Loading = () => (
  <LoadingWraper>
    <SpiningBlock delay="1s" />
  </LoadingWraper>
);
export default Loading;
