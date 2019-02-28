import React from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import ImageTile from './ImageTile';
import H2 from '../Fonts/H2';
import P from '../Fonts/P';
import phoneIcon from '../../utils/icons/PhoneIcon.svg';
import localizationIcon from '../../utils/icons/Localization.svg';

const MainTileWraper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ContentWraper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 48px;
`;
const InfoWraper = styled.div`
  height: 100%;
  width: 100%;
`;
const DarkBg = styled.div`
  position: absolute;
  background-color: #45484d;
  height: 300px;
  width: 100%;
  z-index: -1;
  top: 0;
`;
const HoursWraper = styled.div`
  display: flex;
`;
const LeftHourWraper = styled.div`
  width: 50%;
`;
const RightHourWraper = styled.div`
  width: 50%;
`;
const IconsWraper = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  margin: 0 8px 8px 0;
`;

const RestaurantTile = ({placeData}) => (
  <MainTileWraper>
    <DarkBg />
    <TopBar title={placeData.title} />
    <ContentWraper>
      <ImageTile
        rating={placeData.rating}
        ratingCount={placeData.ratingCount}
      />
      <InfoWraper>
        <H2 underline margin="8px 0 4px 0">
          Informacje
        </H2>
        <IconsWraper>
          <Img src={localizationIcon} alt="localization" />
          <P>{placeData.address}</P>
        </IconsWraper>
        <IconsWraper>
          <Img src={phoneIcon} alt="phone" />
          <P>{placeData.phone}</P>
        </IconsWraper>
        <H2 underline margin="8px 0 4px 0">
          Godziny otwarcia
        </H2>
        <HoursWraper>
          <LeftHourWraper>
            {placeData.openingTime.slice(0, 4).map((time, index) => (
              <P hours key={index}>
                {time}
              </P>
            ))}
          </LeftHourWraper>
          <RightHourWraper>
            {placeData.openingTime.slice(4, 8).map((time, index) => (
              <P key={index}>{time}</P>
            ))}
          </RightHourWraper>
        </HoursWraper>
      </InfoWraper>
    </ContentWraper>
  </MainTileWraper>
);

RestaurantTile.propTypes = {
  placeData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};

export default RestaurantTile;
