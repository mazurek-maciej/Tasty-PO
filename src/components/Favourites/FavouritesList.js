import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import posed from 'react-pose';
import {media} from '../../utils/media';

import P from '../Fonts/P';
import exampleImage from '../../images/manekin.png';

const PosedFav = posed.div({
  enter: {y: 0, opacity: 1},
  exit: {y: -50, opacity: 0},
});

const FavouriteWrapper = styled(PosedFav)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 3rem;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.10);
  border-radius: 8px;
  ${media.phone`
    margin: 0.5rem 0 0.5rem 0;
  `}

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
    <FavouriteWrapper anim={anim} key={res.id}>
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
    </FavouriteWrapper>
  ));
};

export default FavouritesList;
