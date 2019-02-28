import React from 'react';
import styled from 'styled-components';
import H2 from '../Fonts/H2';
import P from '../Fonts/P';

const TextWraper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBar = ({profile, email}) => (
  <TextWraper>
    <H2 style={{textAlign: 'center'}} size="22" margin="0 0 8px 0">
      {profile.name} {profile.surname}
    </H2>
    {/*  Uzupełnić w bazie */}
    <P margin="0 0 8px 0">600600600</P>
    <P margin="0 0 8px 0">{email}</P>
  </TextWraper>
);

export default TextBar;
