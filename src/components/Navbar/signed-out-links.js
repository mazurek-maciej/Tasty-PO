import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MenuButton = styled.li`
  margin-bottom: 1rem;
  cursor: pointer;
  a {
    color: ${({theme}) => theme.colors.$white};
    :hover {
      color: ${({theme}) => theme.colors.$dark};
    }
  }
`;

const SignedOutLinks = () => (
  <ul>
    <MenuButton>
      <Link to={`/signin`}>Zaloguj się</Link>
    </MenuButton>
    <MenuButton>
      <Link to={`/signup`}>Rejestracja</Link>
    </MenuButton>
  </ul>
);

export default SignedOutLinks;
