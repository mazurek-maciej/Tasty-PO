import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import avatar from '../../images/person.jpg';
import {Link} from 'react-router-dom';
import H2 from '../Fonts/H2';
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
const TextWraper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContainer = ({anim, email, profile}) => (
  <>
    <DarkBg />
    <ImageWraper>
      <Image src={avatar} alt="img" />
    </ImageWraper>
    <TextWraper>
      <H2 style={{textAlign: 'center'}} size="22" margin="0 0 8px 0">
        {profile.name} {profile.surname}
      </H2>
      {/*  Uzupełnić w bazie */}
      <P margin="0 0 8px 0">600600600</P>
      <P margin="0 0 8px 0">{email}</P>
    </TextWraper>
  </>
);

MainContainer.propTypes = {
  email: PropTypes.string,
  profile: PropTypes.object,
};

export default MainContainer;
