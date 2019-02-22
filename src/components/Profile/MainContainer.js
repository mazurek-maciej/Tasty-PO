import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import avatar from '../../images/person.jpg';
import P from '../Fonts/P';

const CenterContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  border-radius: 4px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
  background-color: #d8d8d8;
  overflow: hidden;
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const BottomButtonsContainer = styled.div`
  flex: 1;
  height: 3rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${props => (props.border ? '1px solid black' : null)};
  position: relative;
  ::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 10px hsla(0, 0%, 0%, 0.4);
    opacity: 0;
    z-index: -1;
    transition: all 0.1s;
  }
  :active::after {
    opacity: 1;
    z-index: 1;
  }
`;
const Button = styled.a`
  align-self: center;
  font-size: 18px;
  color: ${({theme}) => theme.colors.$D9};
`;
const LinkTo = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: ${({theme}) => theme.colors.$D9};
`;
const animatedInfo = css`
  opacity: 1;
  transform: translateY(0px);
`;
const InfoWraper = styled.div`
  transform: translateY(50px);
  opacity: 0;
  font-size: 1.1rem;
  transition: 0.5s ease all;
  ${props => props.anim && animatedInfo}
`;
const Avatar = styled.img`
  width: 200px;
  height: 200px;
  margin: 16px 0 16px 0;
  border: 1px solid ${({theme}) => theme.colors.$dark};
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 hsla(0, 0%, 30%, 0.3);
`;
const MainContainer = ({anim, auth, profile}) => (
  <CenterContainer>
    <InfoWraper anim={anim}>
      <Avatar src={avatar} alt="avatar" />
      <>
        <P padding="4px 0">
          {profile.name} {profile.surname}
        </P>

        <P padding="4px 0">600900600</P>

        <P padding="4px 0">{auth.email}</P>
      </>
    </InfoWraper>
    <BottomContainer>
      <BottomButtonsContainer border>
        <LinkTo to="/favourites">Lista ulubionych</LinkTo>
      </BottomButtonsContainer>
      <BottomButtonsContainer>
        <Button>Edytuj</Button>
      </BottomButtonsContainer>
    </BottomContainer>
  </CenterContainer>
);

export default MainContainer;
