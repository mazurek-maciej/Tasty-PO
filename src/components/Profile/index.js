import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import posed from 'react-pose';

import Loading from '../Loading';
import TopBar from './TopBar';
import MainContainer from './MainContainer';
import favIcon from '../../utils/icons/FavsIcon.svg';

const PosedMainWraper = posed.div({
  enter: { staggerChildren: 50 },
});
const MainWrapper = styled(PosedMainWraper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileWrapper = styled.div`
  display: flex;
  height: 100%;
  max-width: 900px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
const PosedDarkBg = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});
const DarkBg = styled(PosedDarkBg)`
  position: absolute;
  background-color: #45484d;
  height: 300px;
  width: 100%;
  z-index: -2;
  top: 0;
`;

class Profile extends React.Component {
  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!profile.name) return <Loading />;
    return (
      <React.Fragment>
        <DarkBg />
        <MainWrapper>
          <ProfileWrapper>
            <TopBar />
            <MainContainer email={auth.email} profile={profile} />
            <FavsButton>
              <img src={favIcon} alt="Back button" />
              <Link
                style={{ marginLeft: '8px', color: '#45484D' }}
                to="/favourites"
              >
                Lista ulubionych
              </Link>
            </FavsButton>
          </ProfileWrapper>
        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

Profile.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};

export default connect(mapStateToProps)(Profile);
