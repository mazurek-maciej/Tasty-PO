import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

// Baza danych / autentykacja
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {getRestaurants} from '../../store/actions/restuarantActions';
import {addFavourites} from '../../store/actions/addFavouritesAction';

// Style
import styled from 'styled-components';
import Loading from '../Loading';
import H1 from '../Fonts/H1';

// Mapa
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {Info} from 'styled-icons/material/Info';

const MapLoggedOffWraper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const MarkerWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const CallActionButton = styled(Link)`
  color: ${({theme}) => theme.colors.$D7};
  padding: 4px;
  border: 1px solid ${({theme}) => theme.colors.$D2};
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.2);
`;
let myIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -48],
  shadowUrl: shadowIcon,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
const InfoIcon = styled(Info)`
  width: 3rem;
  height: 3rem;
  color: ${({theme}) => theme.colors.$dark};
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;

const HelloWraper = styled.div`
  align-self: center;
  width: 80%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class MainSite extends Component {
  state = {
    lat: 50.674577,
    lng: 17.918693,
    zoom: 16,
    title: '',
    rating: 0,
    favs: [],
    userLong: 0,
    userLat: 0,
    userGeoIsLoaded: false,
  };
  componentDidUpdate({markerPosition}) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
    }
  }

  render() {
    const {auth, restaurant, favouritesTable} = this.props;
    const {userLong, userLat, userGeoIsLoaded, lat, lng} = this.state;
    const position = [lat, lng];
    if (auth.uid) return <Redirect to="/main" />;
    if (!this.props.restaurant) return <Loading />;
    return (
      <MapLoggedOffWraper>
        <HelloWraper>
          <H1>Witamy w aplikacji Tasty!</H1>
          <div style={{marginTop: '8px'}}>
            <CallActionButton to="/signup">Dołącz do nas</CallActionButton>
          </div>
        </HelloWraper>
        <Map style={{height: '60vh'}} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.props.restaurant.map(restaurant => (
            <Marker
              position={[restaurant.lat, restaurant.lng]}
              icon={myIcon}
              key={restaurant.id}
            >
              <Popup>
                <MarkerWraper>
                  <h2 className="subtitle">{restaurant.title}</h2>
                  {this.calcRating(restaurant.rating, restaurant.ratingCount)}
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
                  </div>
                </MarkerWraper>
              </Popup>
            </Marker>
          ))}
        </Map>
      </MapLoggedOffWraper>
    );
  }
  calcRating = (rate, amount) => {
    if (!rate && !amount) {
      return <p style={{margin: 0}}>Nie oceniono</p>;
    } else if (rate === 0 && amount === 0) {
      return <p style={{margin: 0}}>Nie oceniono</p>;
    }
    const calculation = rate / amount;
    return <p style={{margin: 0}}>{parseInt(calculation)}</p>;
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    restaurant: state.firestore.ordered.restaurants,
    favourites: state.firebase.profile.favourites,
    favouritesTable: state.firebase.profile,
    all: state.firestore,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRestaurants: restaurant => dispatch(getRestaurants(restaurant)),
    addFavourites: (fav, id) => dispatch(addFavourites(fav, id)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{collection: 'restaurants'}]),
)(MainSite);
