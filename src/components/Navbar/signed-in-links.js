import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import styled from "styled-components";

const MenuButton = styled.li`
  margin: 5px;
  a {
    color: #fff
  }
`;
const LinksWraper = styled.ul`
     display: flex;
     flex-direction: column;
     justify-content: center;
`;

const SignedInLinks = (props) => (
    <LinksWraper>
        <MenuButton className='button is-dark'><Link to={`/favourites`}>Ulubione</Link></MenuButton>
        <MenuButton className='button is-dark'><Link to={`/profile`}>Profil</Link></MenuButton>
        <MenuButton onClick={props.signOut} className='button is-dark'>Wyloguj się</MenuButton>
    </LinksWraper>
);

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks)