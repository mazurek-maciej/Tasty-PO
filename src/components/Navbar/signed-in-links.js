import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../../store/actions/authActions';

const MenuButton = styled.li`
  padding: 24px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  :hover,
  :active {
    border-bottom: 1px solid ${({ theme }) => theme.colors.$D6};
  }
  a {
    color: ${({ theme }) => theme.colors.$D9};
  }
`;
const LinksWraper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignedInLinks = props => (
  <LinksWraper>
    <MenuButton>
      <Link to="/favourites">Ulubione</Link>
    </MenuButton>
    <MenuButton>
      <Link to="/profile">Profil</Link>
    </MenuButton>
    <MenuButton onClick={props.signOut}>
      <Link to="/">Wyloguj się</Link>
    </MenuButton>
  </LinksWraper>
);

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
