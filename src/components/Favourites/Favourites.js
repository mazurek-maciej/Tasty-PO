import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Loading from '../Loading';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';
import {KeyboardArrowRight} from 'styled-icons/material/KeyboardArrowRight';

// Baza danych / autentykacja
import {connect} from 'react-redux';
import Layout from '../Layout/layout';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import styled from 'styled-components';

const FavouritesWraper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const FavsWraper = styled.div`
  flex: 1;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 2rem;
  }
`;
const FavouriteWraper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0.5rem 0 0.5rem 0;
  }
`;
const H1 = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
  }
`;
const ArrowRight = styled(KeyboardArrowRight)`
  width: 18px;
  height: 18px;
`;
const H2 = styled.p`
  padding-bottom: 4px;
  padding: 4px 0;
  color: ${props => (props.d ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 40%)')};
  font-weight: ${props => (props.b ? '600' : '400')};
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
  }
  a {
    color: ${({theme}) => theme.colors.$dark};
    :hover {
      ${({theme}) => theme.colors.$primary}
    }
  }
`;
const BackButton = styled(Link)`
  padding: 1rem;
  text-align: center;
  align-self: flex-start;
`;
const ALeft = styled(ArrowLeft)`
  color: ${({theme}) => theme.colors.$primary};
  width: 2rem;
  transition: all 0.2s;
  :hover {
    transform: translateX(-20%);
  }
`;

class Favourites extends Component {
  action() {
    let i;
    let a;
    let restaurantFav = [];
    // pętla sprawdza dla tablicy z ulubionymi czy w tablicy z pobranymi restauracjami
    // pojawia się element z tablicy ulubionych o takich samych id i wrzuca je do
    // tablicy restaurantFav
    for (i = 0; i < this.props.favourites.length; i++) {
      a = this.props.restaurant.find(
        res => res.id === this.props.favourites[i],
      );
      restaurantFav.push(a);
      console.log(restaurantFav);
    }
    return restaurantFav.map(res => (
      <FavouriteWraper>
        <H2 b d>
          {res.title}
          <span>
            <Link
              to={{
                pathname: `/restaurant/${res.id}`,
                state: {
                  res: res,
                },
              }}
            >
              <ArrowRight />
            </Link>
          </span>
        </H2>
        <H2>{res.address}</H2>
        <H2>{res.website}</H2>
      </FavouriteWraper>
    ));
  }

  render() {
    const {auth, favourites, restaurant} = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!favourites) return <Loading />;
    if (!restaurant) return <Loading />;
    console.log(restaurant);
    console.log(favourites);
    return (
      <FavouritesWraper>
        <BackButton to="/main">
          <ALeft />
        </BackButton>
        <H1>Twoje ulubione lokale</H1>
        <FavsWraper>{this.action()}</FavsWraper>
      </FavouritesWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    favourites: state.firebase.profile.favourites,
    restaurant: state.firestore.ordered.restaurants,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: 'restaurants'}]),
)(Favourites);
