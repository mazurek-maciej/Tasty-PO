import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../Loading';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';
import avatar from '../../images/avatar-no-image.png';

const MainWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const InfoWraper = styled.div`
  flex: 2;
  p {
    color: ${({theme}) => theme.colors.$white};
    font-size: 1.2rem;
    padding: 4px 0;
  }
`;
const H1 = styled.h1`
  color: ${({theme}) => theme.colors.$white};
  font-size: 3rem;
  padding: 2rem;
`;
const Avatar = styled.img`
  width: 300px;
  height: 300px;
  padding: 1rem;
  border: 1px solid ${({theme}) => theme.colors.$primary};
  border-radius: 1rem;
  box-shadow: 0 2px 20px 0 rgba(255, 56, 96, 0.4);
`;
const BackButton = styled(Link)`
  padding: 1rem;
  text-align: center;
  align-self: flex-start;
`;
const ALeft = styled(ArrowLeft)`
  color: ${({theme}) => theme.colors.$white};
  width: 2rem;
  transition: all 0.2s;
  :hover {
    transform: translateX(-20%);
  }
`;

class Profile extends React.Component {
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
          <H1>Zarządzaj swoim profilem</H1>
        </div>
        <InfoWraper>
          <Avatar src={avatar} alt="avatar" />
          <div>
            <p>Imię: {profile.name}</p>
            <p>Nazwisko: {profile.surname}</p>
            <p>Email: {auth.email}</p>
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
