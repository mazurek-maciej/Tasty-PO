import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import imejdz from '../../images/alternative.jpeg';

const ImageWraper = styled.div`
  width: 100%;
  padding: 1rem;
`;
const RatingWraper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
`;
const ratingCountSpanStyle = {
  fontSize: '12px',
  color: '#B3B3B3',
};

const ImageTile = ({ rating, ratingCount, calculateRating, imageUrl }) => (
  <React.Fragment>
    <ImageWraper>
      <Image src={imageUrl} alt="img" />
    </ImageWraper>
    <RatingWraper>
      {calculateRating(rating, ratingCount)}
      <span style={ratingCountSpanStyle}>Ilość ocen: {ratingCount}</span>
    </RatingWraper>
  </React.Fragment>
);
ImageTile.propTypes = {
  rating: PropTypes.number,
};

export default ImageTile;
