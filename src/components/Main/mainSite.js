import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { getRestaurants } from '../../store/actions/restuarantActions';
import { addFavourites } from '../../store/actions/addFavouritesAction';

import Loading from '../Loading';

const HelloUserContainer = React.lazy(() => import('./helloUserContainer'));
const MapContainer = React.lazy(() => import('./mapContainer'));

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
    favs: [],
    anim: false,
  };

  componentDidMount() {
    setTimeout(this.handleAnimState(), 500);
  }

  componentDidUpdate({ markerPosition }) {
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
    }
  }

  handleAnimState = () => {
    this.setState(prevState => ({ anim: prevState.anim }));
  };

  handleClick = (e, id) => {
    const { favouritesTable } = this.props;
    if (favouritesTable.favourites.includes(e)) {
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
    }
    if (rate === 0 && amount === 0) {
      return <RatingNumber>Nie oceniono</RatingNumber>;
    }
    const calculation = rate / amount;
    return (
      <StarRatings
        rating={parseInt(calculation)}
        numberOfStars={5}
        name="rating"
        starRatedColor="orange"
        starDimension="24px"
        starSpacing="4px"
      />
    );
  };

  render() {
    const { authInfo, restaurantsList, userInfo } = this.props;
    const { userGeoIsLoaded } = this.state;

    if (!restaurantsList && !userGeoIsLoaded) return <Loading />;
    return (
      <React.Fragment>
        <React.Suspense fallback={<Loading />}>
          <MapAndTextWraper>
            <HelloUserContainer userInfo={userInfo} auth={authInfo} />
            <MapContainer
              handleClick={this.handleClick}
              restaurantsList={restaurantsList}
              calculateRating={this.calculateRating}
              authInfo={authInfo}
            />
          </MapAndTextWraper>
        </React.Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authInfo: state.firebase.auth,
  restaurantsList: state.firestore.ordered.restaurants,
  userInfo: state.firebase.profile,
});

const mapDispatchToProps = dispatch => ({
  getRestaurants: restaurant => dispatch(getRestaurants(restaurant)),
  addFavourites: (fav, id) => dispatch(addFavourites(fav, id)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'restaurants' }])
)(MainSite);
