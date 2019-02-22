import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';
import H2 from '../Fonts/H2';

const animated = css`
  opacity: 1;
`;
const TopWraper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 8px;
  opacity: 0;
  transition: all 0.2s;
  ${props => props.anim && animated}
`;
const BackButton = styled(Link)`
  text-align: center;
`;
const ALeft = styled(ArrowLeft)`
  width: 2rem;
  transition: all 0.2s;
  color: ${({theme}) => theme.colors.$primary};
  :hover {
    transform: translateX(-20%);
  }
`;
const TopContainer = ({anim}) => (
  <TopWraper anim={anim}>
    <BackButton to="/main">
      <ALeft />
    </BackButton>
    <H2 big>Twój profil</H2>
  </TopWraper>
);

export default TopContainer;
