import React, {Component} from 'react'
import styled from 'styled-components'
import SearchMenu from './search_menu'
import '../index.scss'

const Navbar = styled.div `
    display: flex;
    justify-content: flex-end;
    width: 100vw; 
    height: 70px;
    border-bottom: 1px solid #777777;
    background-color: #ff3860;
`;
const MenuButton = styled.a`
  margin: 5px
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
        isSearchMenuActive: ''
    };
    toggleMenu = () => {
        if(this.state.isSearchMenuActive === '') {
            this.setState({ isSearchMenuActive: 'active' })
        } else {
            this.setState({ isSearchMenuActive: '' })
        }
    };

    render() {
        return (
            <div>
                <Navbar>
                        <LogoContainer className="column">
                            <LogoButton href="/">Tasty PO</LogoButton>
                        </LogoContainer>
                        <ButtonsContainer className="column">
                            <MenuButton className='button is-dark'>login</MenuButton>
                            <MenuButton className='button is-dark' onClick={this.toggleMenu}>menu</MenuButton>
                        </ButtonsContainer>
                </Navbar>
                <SearchMenu isSearchMenuActive={this.state.isSearchMenuActive} />
            </div>
        )
    }
}

export default Header