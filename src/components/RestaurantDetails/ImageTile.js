import React from 'react';
import styled from 'styled-components';
import imejdz from '../../images/alternative.jpeg';

const ImageWraper = styled.div`
  width: 100%;
  height: 180px;
`;
const RatingWraper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
`;
const ImageTile = ({rating}) => (
  <>
    <ImageWraper>
      <Image src={imejdz} alt="img" />
    </ImageWraper>
    <RatingWraper>{rating}</RatingWraper>
  </>
);

export default ImageTile;
