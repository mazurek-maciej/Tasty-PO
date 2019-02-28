import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

import Loading from '../Loading';
import TopBar from './TopBar';
import MainContainer from './MainContainer';
import favIcon from '../../utils/icons/FavsIcon.svg';

const PosedMainWraper = posed.div({
  enter: {staggerChildren: 50},
});
const MainWraper = styled(PosedMainWraper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;
const FavsButton = styled.div`
  align-self: flex-start;
  display: flex;
  height: 24px;
  margin: 32px 0 0 16px;
`;

class Profile extends React.Component {
  render() {
    const {auth, profile} = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!profile.name) return <Loading />;
    return (
      <MainWraper>
        <TopBar />
        <MainContainer email={auth.email} profile={profile} />
        <FavsButton>
          <img src={favIcon} />
          <Link style={{marginLeft: '8px', color: '#45484D'}} to="/favourites">
            Lista ulubionych
          </Link>
        </FavsButton>
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

Profile.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};

export default connect(mapStateToProps)(Profile);
