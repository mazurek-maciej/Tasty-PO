import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

const MenuButton = styled.li`
  margin: 5px;
  a {
    color: #fff
  }
`;

const SignedOutLinks = () => (
    <ul>
        <MenuButton className='button is-dark'><Link to={`/signin`}>Zaloguj się</Link></MenuButton>
        <MenuButton className='button is-dark'><Link to={`/signup`}>Rejestracja</Link></MenuButton>
    </ul>
);

export default SignedOutLinks;