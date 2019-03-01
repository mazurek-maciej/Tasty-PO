import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import posed from 'react-pose';

import P from '../Fonts/P';
import exampleImage from '../../images/manekin.png';

const PosedFav = posed.div({
  enter: {y: 0, opacity: 1},
  exit: {y: -50, opacity: 0},
});

const FavouriteWraper = styled(PosedFav)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0.5rem 0 0.5rem 0;
  }
  :after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.$D5};
  }
`;
const FavouriteTopContainer = styled.div`
  flex: 2;
  width: 100%;
  display: flex;
  padding: 8px;
  background-color: ${({theme}) => theme.colors.$D2};
`;
const FavouriteTopLeftContainer = styled.div`
  flex: 1;
`;
const Img = styled.img`
  width: 125px;
  height: 100px;
  padding: 8px;
`;
const FavouriteTopRightContainer = styled.div`
  flex: 2;
`;
const FavouriteBottomContainer = styled.div`
  flex: 1;
  text-align: center;
  width: 100%;
  padding: 8px 0;
  background-color: ${({theme}) => theme.colors.$D1};
`;
const FavouritesList = ({restaurant, favourites, anim}) => {
  const restFavouristList = restaurant.filter(r => favourites.includes(r.id));
  return restFavouristList.map(res => (
    <FavouriteWraper anim={anim} key={res.id}>
      <FavouriteTopContainer>
        <FavouriteTopLeftContainer>
          <Link
            to={{
              pathname: `/restaurant/${res.id}`,
              state: {
                res: res,
              },
            }}
          >
            <Img src={exampleImage} alt="image" />
          </Link>
        </FavouriteTopLeftContainer>
        <FavouriteTopRightContainer>
          <P bold>{res.title}</P>
          <P>{res.website}</P>
        </FavouriteTopRightContainer>
      </FavouriteTopContainer>

      <FavouriteBottomContainer>
        <P>{res.address}</P>
      </FavouriteBottomContainer>
    </FavouriteWraper>
  ));
};

export default FavouritesList;
