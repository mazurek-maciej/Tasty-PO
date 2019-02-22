import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MenuButton = styled.li`
  padding: 24px;
  cursor: pointer;
  a {
    color: ${({theme}) => theme.colors.$white};
    :hover {
      color: ${({theme}) => theme.colors.$dark};
    }
  }
`;
const LinksWraper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignedOutLinks = () => (
  <LinksWraper>
    <MenuButton>
      <Link to={`/signin`}>Zaloguj się</Link>
    </MenuButton>
    <MenuButton>
      <Link to={`/signup`}>Rejestracja</Link>
    </MenuButton>
  </LinksWraper>
);

export default SignedOutLinks;
