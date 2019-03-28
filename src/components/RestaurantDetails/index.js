import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

import { addRatingToRestaurant } from '../../store/actions/addRatingToRestaurant';
import { addRatingToUserProfile } from '../../store/actions/addRatingToUserProfile';

const RestaurantWraper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  scale: 0.1;
  transition: all 0.3s ease-in;
`;

const RateButton = styled.button`
  padding: 4px 16px;
  font-size: 1.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.$cyan90};
  border-radius: 4px;
  box-shadow: 0 2px 12px hsla(0, 0%, 0%, 0.1);
`;

const Index = ({
  auth,
  restaurant,
  location,
  profile,
  addRatingToRestaurant,
  addRatingToUserProfile,
}) => {
  const [rateVisible, setRateVisible] = useState(false);
  const [rateButtonVisible, setRateButtonVisible] = useState(true);

  function calculateRating(rate, amount) {
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
  }

  function checkIfUserRateThisLocation() {
    if (profile) {
      const restId = location.state.res.id;
      const restaurantIdFromUserProfile = profile.userRatings.find(
        id => id === restId
      );
      if (restaurantIdFromUserProfile) {
        setRateButtonVisible(false);
      }
    }
  }

  useEffect(() => {
    if (profile.name) return checkIfUserRateThisLocation();
  });

  const handleRatingClick = rate => {
    const { id } = location.state.res;
    const userId = auth.uid;
    const locationId = location.state.res.id;
    const restaurantTitle = restaurant.find(r => r.id === locationId);
    const incrementCount = restaurantTitle.ratingCount + 1;
    const incrementRating = restaurantTitle.rating + rate;
    addRatingToRestaurant(incrementRating, incrementCount, id);
    addRatingToUserProfile(id, userId);
    setRateVisible(false);
    checkIfUserRateThisLocation();
  };

  if (!location.state && !restaurant && !profile) return <Loading />;
  const place = location.state.res;
  return (
    <React.Fragment>
      <RestaurantWraper>
        <RestaurantTile
          placeData={place}
          calculateRating={calculateRating}
          imageUrl={place.imageUrl}
        />
        {rateButtonVisible ? (
          <RateButton
            type="submit"
            onClick={() => setRateVisible(!rateVisible)}
          >
            Oceń
          </RateButton>
        ) : null}
        <RatingsStars
          profile={profile}
          location={location}
          handleRatingClick={handleRatingClick}
          visible={rateVisible}
          setRateVisible={setRateVisible}
          checkIfUserRateThisLocation={checkIfUserRateThisLocation}
        />
      </RestaurantWraper>
      {auth.uid ? <CommentForm restId={place.id} /> : null}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  restaurant: state.firestore.ordered.restaurants,
  profile: state.firebase.profile,
});

const mapDispatchToProps = dispatch => ({
  addRatingToRestaurant: (rate, count, id) =>
    dispatch(addRatingToRestaurant(rate, count, id)),
  addRatingToUserProfile: (restaurantId, userId) =>
    dispatch(addRatingToUserProfile(restaurantId, userId)),
});

Index.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,
  profile: PropTypes.object.isRequired,
  restaurant: PropTypes.array,
  addRatingToRestaurant: PropTypes.func.isRequired,
  addRatingToUserProfile: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'restaurants' }])
)(Index);
