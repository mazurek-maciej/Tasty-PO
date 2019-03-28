import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import styled from 'styled-components';
import H2 from '../Fonts/H2';

const RatingWraper = styled.div`
  position: fixed;
  bottom: 0;
  display: ${props => (props.disp ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.$cyan90};
  box-shadow: 0 6px 14px hsla(0, 0%, 0%, 0.5);
  z-index: 1;
`;
const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
const CloseButton = styled.button`
  background: transparent;
  border: transparent;
  color: white;
  font-size: 1rem;
`;

const RatingsStars = ({
  profile,
  handleRatingClick,
  visible,
  setRateVisible,
  checkIfUserRateThisLocation,
}) => {
  useEffect(() => {
    if (profile.name) return checkIfUserRateThisLocation();
  });
  const handleChange = e => {
    handleRatingClick(e);
  };

  return (
    <RatingWraper disp={visible}>
      <TopWrapper>
        <CloseButton
          style={{ alignSelf: 'flex-end' }}
          type="submit"
          onClick={() => setRateVisible(false)}
          placeholder="x"
        >
          X
        </CloseButton>
        <H2 white>Oceń restaurację</H2>
      </TopWrapper>
      <div>
        <StarRatings
          numberOfStars={5}
          name="rating"
          changeRating={e => handleChange(e)}
        />
      </div>
    </RatingWraper>
  );
};

RatingsStars.propTypes = {
  visible: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  handleRatingClick: PropTypes.func.isRequired,
  setRateVisible: PropTypes.func.isRequired,
};

export default RatingsStars;
