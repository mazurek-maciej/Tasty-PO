import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';
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
const LinksWraper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignedInLinks = props => (
  <LinksWraper>
    <MenuButton>
      <Link to={`/favourites`}>Ulubione</Link>
    </MenuButton>
    <MenuButton>
      <Link to={`/profile`}>Profil</Link>
    </MenuButton>
    <MenuButton onClick={props.signOut}>
      <Link to={`/`}>Wyloguj się</Link>
    </MenuButton>
  </LinksWraper>
);

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SignedInLinks);
