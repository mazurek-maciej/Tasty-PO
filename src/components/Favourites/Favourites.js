import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import posed from 'react-pose';
import styled from 'styled-components';

// Baza danych / autentykacja
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import TopContainer from './TopContainer';
import FavouritesList from './FavouritesList';
import Loading from '../Loading';

const PosedFavsWraper = posed.div({
  enter: { staggerChildren: 50 },
});
const FavouritesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainWrapper = styled(PosedFavsWraper)`
  display: flex;
  height: 100%;
  max-width: 900px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const FavsWraper = styled.div`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

class Favourites extends Component {
  state = {
    anim: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ anim: true });
    }, 300);
  }

  render() {
    const { auth, favourites, restaurant } = this.props;
    const { anim } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!restaurant) return <Loading />;
    if (!favourites) return <Loading />;
    return (
      <FavouritesWrapper>
        <MainWrapper>
          <TopContainer anim={anim} />
          <FavsWraper>
            <FavouritesList
              favourites={favourites}
              restaurant={restaurant}
              anim={anim}
            />
          </FavsWraper>
        </MainWrapper>
      </FavouritesWrapper>
    );
  }
}

Favourites.propTypes = {
  auth: PropTypes.object.isRequired,
  favourites: PropTypes.array,
  restaurant: PropTypes.array,
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  favourites: state.firebase.profile.favourites,
  restaurant: state.firestore.ordered.restaurants,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'restaurants' }])
)(Favourites);
