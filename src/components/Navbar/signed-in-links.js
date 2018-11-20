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

const SignedInLinks = (props) => (
    <ul>
        <MenuButton className='button is-dark'><Link to={`/favourites`}>Ulubione</Link></MenuButton>
        <MenuButton onClick={props.signOut} className='button is-dark'>Wyloguj się</MenuButton>
    </ul>
);

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks)