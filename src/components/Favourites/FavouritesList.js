import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import P from '../Fonts/P';
import exampleImage from '../../images/manekin.png';

const animationFade = css`
  opacity: 1;
  transform: translateY(0);
`;
const FavouriteWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s all ease-in-out;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.1);
  ${props => props.anim && animationFade};
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
    <FavouriteWraper anim={anim}>
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
          <P b d>
            {res.title}
          </P>
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
