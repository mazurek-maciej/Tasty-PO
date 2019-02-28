import React from 'react';
import styled, {css} from 'styled-components';
import avatar from '../../images/person.jpg';
import {Link} from 'react-router-dom';
import P from '../Fonts/P';

const ImageWraper = styled.div``;
const Image = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5),
    inset 0 4px 8px 0 rgba(173, 173, 173, 0.4);
  border: solid 1px #cccccc;
`;
const DarkBg = styled.div`
  position: absolute;
  background-color: #45484d;
  height: 300px;
  width: 100%;
  z-index: -1;
  top: 0;
`;
const MainContainer = ({anim, auth, profile}) => (
  <>
    {console.log(profile)}
    <DarkBg />
    <ImageWraper>
      <Image src={avatar} alt="img" />
    </ImageWraper>
  </>
);

export default MainContainer;
