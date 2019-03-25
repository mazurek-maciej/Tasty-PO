import React from 'react';
import styled from 'styled-components';
import { Favorite } from 'styled-icons/material/Favorite';
import { Info } from 'styled-icons/material/Info';
import { Link } from 'react-router-dom';

// Mapa
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import '../../../node_modules/react-leaflet-search/lib/react-leaflet-search.css';

const MarkerWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -48],
  shadowUrl: shadowIcon,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
const MapOverride = styled(Map)`
  border-top: 4px solid ${({ theme }) => theme.colors.$cyan100};
`;
const InfoIcon = styled(Info)`
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.$dark};
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;
const PopUpTitle = styled.span`
  font-size: ${props => (props.small ? '0.8rem' : '1.2rem')};
  margin-bottom: 4px;
  color: hsl(0, 0%, 10%);
  font-weight: 600;
`;
const FavIcon = styled(Favorite)`
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.$primary};
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;

class MapContainer extends React.Component {
  render() {
    const { restaurantsList, calculateRating, authInfo } = this.props;
    const position = [50.667367, 17.926544];
    return (
      <MapOverride style={{ height: '60vh' }} center={position} zoom="16">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {restaurantsList.map(restaurant => (
          <Marker
            position={[restaurant.lat, restaurant.lng]}
            icon={myIcon}
            key={restaurant.id}
          >
            <Popup>
              <MarkerWraper>
                <PopUpTitle>{restaurant.title}</PopUpTitle>
                <PopUpTitle small>{restaurant.address}</PopUpTitle>
                {calculateRating(restaurant.rating, restaurant.ratingCount)}

                <div>
                  <Link
                    to={{
                      pathname: `/restaurant/${restaurant.id}`,
                      state: {
                        res: restaurant,
                      },
                    }}
                  >
                    <InfoIcon />
                  </Link>
                  {authInfo.uid ? (
                    <FavIcon
                      onClick={() =>
                        this.handleClick(restaurant.id, authInfo.uid)
                      }
                    />
                  ) : null}
                </div>
              </MarkerWraper>
            </Popup>
          </Marker>
        ))}
      </MapOverride>
    );
  }
}

export default MapContainer;
