import React, {Component} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchMenu from './search_menu'
import SignedOutLinks from './signed-out-links'
import SignedInLinks from './signed-in-links'
import '../index.scss'

const Navbar = styled.div `
    display: flex;
    justify-content: flex-end;
    width: 100vw; 
    height: 70px;
    border-bottom: ${({ bB }) => bB ? '1px solid transparent' : '1px solid #363636'};
    background-color: #ed4263;
    position: sticky;
`;
const MenuButton = styled.a`
  margin: 1rem
`;
const LogoButton = styled.a`
  font-size: 2rem;
  color: #282c34;
  font-weight: lighter;
  transition: all 0.2s;
  :hover {
    color: #fff;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

class Header extends Component {
    state = {
        isSearchMenuActive: '',
        bB: false
    };
    toggleMenu = () => {
        if(this.state.isSearchMenuActive === '') {
            this.setState({
                isSearchMenuActive: 'active',
                bB: true
            })
        } else {
            this.setState({
                isSearchMenuActive: '',
                bB: false
            })
        }
    };
    
    render() {
        const { auth } = this.props;
        const { bB } = this.state
        const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;
        console.log(this.state.bB)
        return (
            <div>
                <Navbar bB={bB}>
                        <LogoContainer className="column">
                            <LogoButton as={Link} to="/">Tasty PO</LogoButton>
                        </LogoContainer>
                        <ButtonsContainer className="column">
                            <MenuButton className='button is-dark' onClick={this.toggleMenu}><ion-icon name="menu"></ion-icon></MenuButton>
                        </ButtonsContainer>
                </Navbar>
                <SearchMenu isSearchMenuActive={this.state.isSearchMenuActive} links={links}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Header)