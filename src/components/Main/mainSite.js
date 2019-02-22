import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import HelloUserContainer from './helloUserContainer';
import MapContainer from './mapContainer';

// Baza danych / autentykacja
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {getRestaurants} from '../../store/actions/restuarantActions';
import {addFavourites} from '../../store/actions/addFavouritesAction';

// Style
import styled from 'styled-components';
import Loading from '../Loading';

const MapAndTextWraper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const RatingNumber = styled.span`
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: hsl(0, 0%, 38%);
`;

class MainSite extends Component {
  state = {
    lat: 50.674577,
    lng: 17.918693,
    zoom: 16,
    favs: [],
    anim: false,
    addedToFavs: false,
  };
  componentDidMount() {
    setTimeout(this.handleAnimState(), 500);
  }
  handleAnimState = () => {
    this.setState(prevState => ({anim: prevState.anim}));
    console.log(this.state.anim);
  };

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
    }
  };
  calculateRating = (rate, amount) => {
    if (!rate && !amount) {
      return <RatingNumber>Nie oceniono</RatingNumber>;
    } else if (rate === 0 && amount === 0) {
      return <RatingNumber>Nie oceniono</RatingNumber>;
    }
    const calculation = rate / amount;
    return <RatingNumber>{parseInt(calculation)}</RatingNumber>;
  };

  render() {
    const {authInfo, restaurantsList, userInfo} = this.props;
    const {userGeoIsLoaded} = this.state;

    if (!authInfo.uid) return <Redirect to="/signin" />;
    if (!restaurantsList && !userGeoIsLoaded) return <Loading />;
    return (
      <MapAndTextWraper>
        <HelloUserContainer userInfo={userInfo} />
        <MapContainer
          state={this.state}
          handleClick={this.handleClick}
          restaurantsList={restaurantsList}
          calculateRating={this.calculateRating}
          authInfo={authInfo}
        />
      </MapAndTextWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.firebase.auth,
    restaurantsList: state.firestore.ordered.restaurants,
    favourites: state.firebase.profile.favourites,
    userInfo: state.firebase.profile,
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
