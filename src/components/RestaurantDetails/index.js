import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import StarRatings from 'react-star-ratings';

import CommentForm from './Comments/index.js';
import Loading from '../Loading';
import RestaurantTile from './RestaurantTile';
import RatingsStars from './RatingsStars';
import PopUp from './popUp';

import { addRatingToRestaurant } from '../../store/actions/addRatingToRestaurant';
import { addRatingToUserProfile } from '../../store/actions/addRatingToUserProfile';

const AllWraper = styled.div`
  height: fit-content;
  overflow: hidden;
  @media (min-width: 320px) and (max-width: 480px) {
    height: fit-content;
  }
`;
const animation = css`
  opacity: 1;
  scale: 1;
`;
const RestaurantWraper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  opacity: 0;
  scale: 0.1;
  transition: all 0.3s ease-in;
  ${props => props.anim && animation};
`;

class Index extends Component {
  constructor(props) {
    super(props);
    this.checkIfUserRateThisLocation = this.checkIfUserRateThisLocation.bind(
      this
    );
    this.state = {
      animation: false,
      favs: 0,
      activeRatings: false,
      popUp: false,
    };
  }

  componentDidMount() {
    this.handleAnimation();
    if (this.props.profile.userRatings) {
      setTimeout(this.checkIfUserRateThisLocation, 800);
    }
  }

  calculateRating = (rate, amount) => {
    if (!rate && !amount) {
      return <div>Nie oceniono</div>;
    }
    if (rate === 0 && amount === 0) {
      return <div>Nie oceniono</div>;
    }
    const calculation = rate / amount;
    return (
      <StarRatings
        rating={parseInt(calculation)}
        numberOfStars={5}
        name="rating"
        starRatedColor="orange"
        starDimension="24px"
        starSpacing="4px"
      />
    );
  };

  handleRatingClick = (rate, id, userId) => {
    const locationId = this.props.location.state.res.id;
    const name = this.props.restaurant.find(r => r.id === locationId);
    const incrementedCount = name.ratingCount + 1;
    const incrementedRating = name.rating + rate;
    this.props.addRatingToRestaurant(incrementedRating, incrementedCount, id);
    this.props.addRatingToUserProfile(id, userId);
    this.checkIfUserRateThisLocation();
    this.handlePopUp();
  };

  handleAnimation = () => {
    setTimeout(() => this.setState({ animation: true }), 500);
  };

  handlePopUp = () => {
    this.setState(prevState => ({ popUp: !prevState.popUp }));
    setTimeout(() => {
      this.setState({ popUp: false });
      this.checkIfUserRateThisLocation();
    }, 1000);
  };

  checkIfUserRateThisLocation() {
    if (this.props.profile) {
      const restId = this.props.location.state.res.id;
      const restaurantIdFromUserProfile = this.props.profile.userRatings.find(
        id => id === restId
      );
      if (!restaurantIdFromUserProfile) {
        this.setState({ activeRatings: true });
      }
    }
  }

  render() {
    const { auth, restaurant, location, profile, userRated } = this.props;
    const { activeRatings, popUp, animation } = this.state;

    if (!location.state) return <Loading />;
    if (!restaurant) return <Loading />;
    if (!profile) return <Loading />;
    const place = this.props.location.state.res;
    return (
      <React.Fragment>
        <AllWraper>
          <PopUp active={popUp} />
          <RestaurantWraper anim={animation}>
            <RestaurantTile
              placeData={place}
              calculateRating={this.calculateRating}
              imageUrl={place.imageUrl}
            />
            <RatingsStars
              place={place.id}
              authUid={auth.uid}
              disp={activeRatings}
              hide={userRated}
              handleClick={this.handleRatingClick}
            />
          </RestaurantWraper>
          {auth.uid ? <CommentForm restId={place.id} /> : null}
        </AllWraper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  restaurant: state.firestore.ordered.restaurants,
  favourites: state.firebase.profile.favourites,
  ratesFromProfile: state.firebase.profile.userRatings,
  profile: state.firebase.profile,
  userRated: state.auth.userRated,
});

const mapDispatchToProps = dispatch => ({
  addRatingToRestaurant: (rate, count, id) =>
    dispatch(addRatingToRestaurant(rate, count, id)),
  addRatingToUserProfile: (restaurantId, userId) =>
    dispatch(addRatingToUserProfile(restaurantId, userId)),
});

Index.propTypes = {
  auth: PropTypes.object,
  firebase: PropTypes.object,
  firestore: PropTypes.object,
  location: PropTypes.object,
  profile: PropTypes.object.isRequired,
  restaurant: PropTypes.array,
  favourites: PropTypes.array,
  ratesFromProfile: PropTypes.array,
  addRatingToRestaurant: PropTypes.func,
  addRatingToUserProfile: PropTypes.func,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'restaurants' }])
)(Index);
