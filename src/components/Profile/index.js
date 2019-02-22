import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import Loading from '../Loading';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';
import avatar from '../../images/avatar-no-image.png';

const MainWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;
const animatedInfo = css`
  opacity: 1;
  transform: translateY(0px);
`;
const animatedH1 = css`
  opacity: 1;
`;
const InfoWraper = styled.div`
  flex: 2;
  transform: translateY(50px);
  opacity: 0;
  font-size: 1.1rem;
  transition: 0.5s ease all;
  ${props => props.anim && animatedInfo}
  p {
    padding: 4px 0;
    color: hsla(0, 0%, 0%, 0.8);
  }
  span {
    color: hsla(0, 0%, 0%, 0.4);
  }
`;
const H1 = styled.h1`
  font-size: 3rem;
  padding: 2rem;
  opacity: 0;
  transition: 0.8s ease all;
  ${props => props.anim && animatedH1}
`;
const Avatar = styled.img`
  width: 300px;
  height: 300px;
  padding: 1rem;
  border: 1px solid ${({theme}) => theme.colors.$dark};
  border-radius: 1rem;
  box-shadow: 0 2px 20px 0 hsla(0, 0%, 30%, 0.3);
`;
const BackButton = styled(Link)`
  padding: 1rem;
  text-align: center;
  align-self: flex-start;
`;
const ALeft = styled(ArrowLeft)`
  width: 2rem;
  transition: all 0.2s;
  color: ${({theme}) => theme.colors.$primary};
  :hover {
    transform: translateX(-20%);
  }
`;

class Profile extends React.Component {
  state = {
    anim: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({anim: true});
    }, 300);
  }

  render() {
    const {auth, profile} = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!profile.name) return <Loading />;
    console.log(profile);
    console.log(auth);

    return (
      <MainWraper>
        <BackButton to="/main">
          <ALeft />
        </BackButton>
        <div>
          <H1 anim={this.state.anim}>Twój profil</H1>
        </div>
        <InfoWraper anim={this.state.anim}>
          <Avatar src={avatar} alt="avatar" />
          <div>
            <p>
              <span>Imię:</span> {profile.name}
            </p>

            <p>
              <span>Nazwisko:</span> {profile.surname}
            </p>

            <p>
              <span>Email:</span> {auth.email}
            </p>
          </div>
        </InfoWraper>
      </MainWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Profile);
