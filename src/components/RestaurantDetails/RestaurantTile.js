import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import ImageTile from './ImageTile';
import H2 from '../Fonts/H2';
import P from '../Fonts/P';

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

const RestaurantTile = ({placeData}) => (
  <MainTileWraper>
    <DarkBg />
    <TopBar title={placeData.title} />
    <ContentWraper>
      <ImageTile rating={placeData.rating} />
      <InfoWraper>
        <H2 margin="8px 0 4px 0">Informacje</H2>
        <P>{placeData.address}</P>
        <P>{placeData.phone}</P>
        <H2 margin="8px 0 4px 0">Godziny otwarcia</H2>
        <HoursWraper>
          <LeftHourWraper>
            <P>Pn:</P>
            <P>Wt:</P>
            <P>Śr:</P>
            <P>Czw:</P>
          </LeftHourWraper>
          <RightHourWraper>
            <P>Pt:</P>
            <P>Sb:</P>
            <P>Nd:</P>
          </RightHourWraper>
        </HoursWraper>
      </InfoWraper>
    </ContentWraper>
  </MainTileWraper>
);

export default RestaurantTile;
