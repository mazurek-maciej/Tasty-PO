import React, {
    Component
} from 'react'
import styled from 'styled-components'
import {
    connect
} from 'react-redux'
import {
    Link
} from 'react-router-dom'
import SearchMenu from './search_menu'
import SignedOutLinks from './signed-out-links'
import SignedInLinks from './signed-in-links'
import {
    Menu
} from 'styled-icons/feather/Menu';
import '../index.scss'

const Navbar = styled.div `
    display: flex;
    justify-content: flex-end;
    width: 100vw; 
    height: 10vh;
    background-color: #ed4263;
    position: sticky;
`;
const MenuButton = styled.a `
  margin: 1rem
`
const LogoButton = styled.a `
  font-size: 2rem;
  color: #282c34;
  font-weight: lighter;
  transition: all 0.2s;
  :hover {
    color: #fff;
  }
`;
const ButtonsContainer = styled.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LogoContainer = styled.div `
  display: flex;
  align-items: center;
`;
const MenuIcon = styled(Menu)
`
    color: ${({theme}) => theme.colors.$white};
    width: 1rem;
    height: 1rem;
`

class Header extends Component {
    constructor(props) {
        super(props);
        this.navToggle = React.createRef();
    }
    state = {
        isSearchMenuActive: ''
    };
    toggleMenu = () => {
        if (this.state.isSearchMenuActive === '') {
            this.setState({
                isSearchMenuActive: 'active',
            })
        } else {
            this.setState({
                isSearchMenuActive: '',
            })
        }
    };

    toggleOutsideClick = (event) => {
        if (this.state.isSearchMenuActive === 'active' && !this.navToggle.current.contains(event.target)) {
            this.setState({
                isSearchMenuActive: ''
            })
        }
    };
    componentDidMount() {
        window.addEventListener('click', this.toggleOutsideClick)
    }

    render() {
        const {
            auth
        } = this.props;
        const links = auth.uid ? < SignedInLinks / > : < SignedOutLinks / > ;
        // console.log(this.state.bB)
        return ( 
            <div>
                <Navbar>
                    <LogoContainer className = "column" >
                        <LogoButton as = {
                            Link
                        }
                        to = "/main" > Tasty PO </LogoButton> 
                    </LogoContainer> 
                    <ButtonsContainer className = "column">
                    <MenuButton className = 'button is-dark'
                        ref = {
                            this.navToggle
                        }
                        onClick = {
                            this.toggleMenu
                        }> 
                    <MenuIcon/> 
                    </MenuButton> 
                    </ButtonsContainer> 
                </Navbar> 
                <SearchMenu isSearchMenuActive = {
                    this.state.isSearchMenuActive
                }
                links = {
                    links
                }
                /> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Header)