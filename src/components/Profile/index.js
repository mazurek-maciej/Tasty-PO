import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../Loading';
import TopContainer from './TopContainer';
import MainContainer from './MainContainer';

const MainWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
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
        <TopContainer anim={this.state.anim} />
        <MainContainer anim={this.state.anim} auth={auth} profile={profile} />
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
