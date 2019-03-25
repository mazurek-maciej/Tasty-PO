import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

import avatar from '../../images/person.jpg';
import H2 from '../Fonts/H2';
import P from '../Fonts/P';

const PosedTextWraper = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
});
const ImageWraper = styled(PosedTextWraper)``;
const Image = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3),
    inset 0 4px 8px 0 rgba(173, 173, 173, 0.4);
  border: solid 1px #cccccc;
`;

const TextWraper = styled(PosedTextWraper)`
  display: flex;
  flex-direction: column;
`;

const MainContainer = ({ email, profile }) => (
  <React.Fragment>
    <ImageWraper>
      <Image src={avatar} alt="img" />
    </ImageWraper>
    <TextWraper>
      <H2 style={{ textAlign: 'center' }} size="22" margin="0 0 8px 0">
        {profile.name} {profile.surname}
      </H2>
      {/*  Uzupełnić w bazie */}
      <P margin="0 0 8px 0">600600600</P>
      <P margin="0 0 8px 0">{email}</P>
    </TextWraper>
  </React.Fragment>
);

MainContainer.propTypes = {
  email: PropTypes.string,
  profile: PropTypes.object,
};

export default MainContainer;
