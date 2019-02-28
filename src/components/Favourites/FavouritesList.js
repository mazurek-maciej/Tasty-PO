import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import posed from 'react-pose';

import P from '../Fonts/P';
import exampleImage from '../../images/manekin.png';

const animationFade = css`
  opacity: 1;
  transform: translateY(0);
`;

const PosedFav = posed.div({
  enter: {y: 0, opacity: 1},
  exit: {y: -50, opacity: 0},
});

const FavouriteWraper = styled(PosedFav)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.1);
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
`;
const FavouritesList = ({restaurant, favourites, anim}) => {
  let i;
  let a;
  let restaurantFav = [];
  // pętla sprawdza dla tablicy z ulubionymi czy w tablicy z pobranymi restauracjami
  // pojawia się element z tablicy ulubionych o takich samych id i wrzuca je do
  // tablicy restaurantFav
  for (i = 0; i < favourites.length; i++) {
    a = restaurant.find(res => res.id === favourites[i]);
    restaurantFav.push(a);
  }
  return restaurantFav.map(res => (
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
          <P b>{res.title}</P>
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
