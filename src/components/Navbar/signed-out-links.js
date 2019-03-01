import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MenuButton = styled.li`
  padding: 24px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  :hover,
  :active {
    border-bottom: 1px solid ${({theme}) => theme.colors.$D6};
  }
  a {
    color: ${({theme}) => theme.colors.$D9};
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
