import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

// Baza danych / autentykacja
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {getRestaurants} from '../../store/actions/restuarantActions';
import {addFavourites} from '../../store/actions/addFavouritesAction';

// Style
import styled from 'styled-components';
import Loading from '../Loading';
import {Favorite} from 'styled-icons/material/Favorite';
import {Info} from 'styled-icons/material/Info';

// Mapa
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {ReactLeafletSearch} from 'react-leaflet-search';
import '../../../node_modules/react-leaflet-search/lib/react-leaflet-search.css';

const MapContainer = styled.div`
  width: 100vw;
  height: 60vh;
  background-color: ${({theme}) => theme.colors.$dark};
`;
const MarkerWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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
const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
  }
`;
const H2 = styled.h2`
  color: ${({theme}) => theme.colors.$primary};
  font-size: 2rem;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
  }
`;
const FavIcon = styled(Favorite)`
  width: 3rem;
  height: 3rem;
  color: ${({theme}) => theme.colors.$primary};
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;
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
const PopUpTitle = styled.span`
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: hsl(0, 0%, 10%);
  font-weight: 600;
`;
const RatingNumber = styled.span`
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: hsl(0, 0%, 38%);
`;
const HelloWraper = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  render() {
    const {auth, restaurant, favouritesTable} = this.props;
    const {userLong, userLat, userGeoIsLoaded, lat, lng} = this.state;
    const position = [lat, lng];
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!restaurant && !userGeoIsLoaded) return <Loading />;
    console.log(restaurant);
    return (
      <div>
        <HelloWraper>
          <H1>
            Witaj {favouritesTable.name} {favouritesTable.surname}!
          </H1>
          <H2>Znajdź swój ulubiony lokal</H2>
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
                  <PopUpTitle>{restaurant.title}</PopUpTitle>
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
                    {/*<a  className='button'><Favorite/></a>*/}
                    <FavIcon
                      onClick={() => this.handleClick(restaurant.id, auth.uid)}
                    />
                  </div>
                </MarkerWraper>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
  componentDidMount() {}

  componentDidUpdate({markerPosition}) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
    }
  }
  handleClick = (e, id) => {
    // sprawdzenie czy tablica ulubionych pobrana z firestore zawiera element
    // przesłany z buttona, czyli w tym przypadku ID danego lokalu
    if (this.props.favouritesTable.favourites.includes(e)) {
      console.log('lokal już został zapisany');
    } else {
      this.setState({
        favs: [...this.state.favs, e],
      });
      this.props.addFavourites(e, id);
      console.log('a');
    }
    // console.log(this.props.favs)
    // this.props.addFavourites(e)
  };
  calcRating = (rate, amount) => {
    if (!rate && !amount) {
      return <RatingNumber>Nie oceniono</RatingNumber>;
    } else if (rate === 0 && amount === 0) {
      return <RatingNumber>Nie oceniono</RatingNumber>;
    }
    const calculation = rate / amount;
    return <RatingNumber>{parseInt(calculation)}</RatingNumber>;
  };
}

const mapStateToProps = state => {
  console.log(state);
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
