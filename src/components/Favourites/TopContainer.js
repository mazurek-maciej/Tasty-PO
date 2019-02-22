import React from 'react';
import styled, {css} from 'styled-components';
import H2 from '../Fonts/H2';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';
import {Link} from 'react-router-dom';

const animationTopWraper = css`
  opacity: 1;
`;
const TopWraper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 8px;
  opacity: 0;
  transition: 0.5s all ease-in-out;
  ${props => props.anim && animationTopWraper}
`;
const BackButton = styled(Link)`
  text-align: center;
  align-self: flex-start;
`;
const ALeft = styled(ArrowLeft)`
  color: ${({theme}) => theme.colors.$primary};
  width: 2rem;
  transition: all 0.2s;
  :hover {
    transform: translateX(-20%);
  }
`;
const TopContainer = ({anim}) => (
  <TopWraper anim={anim}>
    <BackButton to="/main">
      <ALeft />
    </BackButton>
    <H2 big>Twoje ulubione lokale</H2>
  </TopWraper>
);

export default TopContainer;
