import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mainBg from '../../images/MainBg.jpg';
import H1 from '../Fonts/H1';

const CallActionButton = styled(Link)`
  color: ${({ theme }) => theme.colors.$D2};
  background: hsl(140, 50%, 50%);
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 8px;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.2);
`;
const HelloWraper = styled.div`
  align-self: center;
  width: 80%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ImageShape = styled.div`
  position: absolute;
  background: url(${mainBg});
  background-size: cover;
  top: 0;
  right: 0;
  max-width: 1000px;
  width: 100%;
  height: 600px;
  clip-path: circle(50% at 70% 30%);
  z-index: -1;
`;
const ShapeBg = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.$cyan90};
  background-size: cover;
  top: 0;
  right: 0;
  max-width: 1030px;
  width: 100%;
  height: 640px;
  clip-path: circle(50% at 70% 30%);
  z-index: -2;
`;

const HelloUserContainer = () => (
  <React.Fragment>
    <HelloWraper>
      <H1>Witamy w aplikacji Tasty!</H1>
      <div style={{ marginTop: '8px' }}>
        <CallActionButton to="/signup">Dołącz do nas</CallActionButton>
      </div>
    </HelloWraper>
    <ImageShape />
    <ShapeBg />
  </React.Fragment>
);

export default HelloUserContainer;
