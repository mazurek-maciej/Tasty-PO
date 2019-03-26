import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, X } from 'styled-icons/feather';
import SearchMenu from './search_menu';
import SignedOutLinks from './signed-out-links';
import SignedInLinks from './signed-in-links';
import logo from '../../images/TastyLogo.svg';

const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.$D2};
  position: sticky;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
`;
const MenuButton = styled.button`
  margin: 1rem;
  border: transparent;
  background: transparent;
`;
const LogoButton = styled.a`
  font-size: 2rem;
  color: #282c34;
  font-weight: lighter;
  transition: all 0.2s;
  :active {
    color: ${({ theme }) => theme.colors.$D6};
  }
`;
const PosedMenu = posed(Menu)({
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { ease: 'easeIn', duration: 300 },
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
    },
  },
});
const PosedClickedMenu = posed(X)({
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { ease: 'easeIn', duration: 300 },
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
    },
  },
});
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MenuIcon = styled(PosedMenu)`
  display: ${props => (!props.popOut ? 'flex' : 'none')};
  color: ${({ theme }) => theme.colors.$D9};
  width: 2rem;
  height: 2rem;
  :active {
    ${({ theme }) => theme.colors.$dark}
  }
`;
const ClickedMenuIcon = styled(PosedClickedMenu)`
  display: ${props => (props.popOut ? 'block' : 'none')};
  color: ${({ theme }) => theme.colors.$D9};
  width: 2rem;
  height: 2rem;
  :active {
    ${({ theme }) => theme.colors.$dark}
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.navToggle = React.createRef();
  }

  state = {
    isSearchMenuActive: '',
    popMenu: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.toggleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.toggleOutsideClick);
  }

  toggleMenu = () => {
    if (this.state.isSearchMenuActive === '') {
      this.setState({
        isSearchMenuActive: 'active',
        popMenu: true,
      });
    } else {
      this.setState({
        isSearchMenuActive: '',
        popMenu: false,
      });
    }
  };

  toggleOutsideClick = event => {
    if (
      this.state.isSearchMenuActive === 'active' &&
      !this.navToggle.current.contains(event.target)
    ) {
      this.setState({
        isSearchMenuActive: '',
        popMenu: false,
      });
    }
  };

  render() {
    const { popMenu, isSearchMenuActive } = this.state;
    const { auth } = this.props;
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    return (
      <React.Fragment>
        <Navbar>
          <LogoContainer className="column">
            <LogoButton as={Link} to="/">
              Tasty
            </LogoButton>
          </LogoContainer>
          <ButtonsContainer className="column">
            <MenuButton ref={this.navToggle} onClick={this.toggleMenu}>
              <MenuIcon
                popOut={popMenu}
                pose={popMenu ? 'hidden' : 'visible'}
              />
              <ClickedMenuIcon
                popOut={popMenu}
                pose={popMenu ? 'visible' : 'hidden'}
              />
            </MenuButton>
          </ButtonsContainer>
        </Navbar>
        <SearchMenu isSearchMenuActive={isSearchMenuActive} links={links} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(Header);
