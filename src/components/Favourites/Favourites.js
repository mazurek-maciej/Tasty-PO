import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

// Baza danych / autentykacja
import { connect } from 'react-redux';
import Layout from "../Layout/layout";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import styled from "styled-components";

const FavouritesWraper = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;
const FavsWraper = styled.div`
  flex: 1;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 2rem
  }
`;
const FavouriteWraper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: .5rem 0 .5rem 0;
  }
`;
const H1 = styled.h1`
  color: ${({theme}) => theme.colors.$white};
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  margin: 2rem;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
    margin: 1rem;
  }
`;
const H2 = styled.h2`
  color: ${({theme, t}) => t ? theme.colors.$primary : theme.colors.$white};
  font-size: 2rem;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
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
        for (i=0; i < this.props.favourites.length; i++) {
            a = this.props.restaurant.find(res => res.id === this.props.favourites[i]);
            restaurantFav.push(a);
            console.log(restaurantFav)
        }
        return (
            restaurantFav.map(res => (
                <FavouriteWraper>
                    <H2 t>{res.title}</H2>
                    <H2>{res.address}</H2>
                    <H2>{res.website}</H2>
                </FavouriteWraper>
            ))
        )
    };


    render() {
        const { auth, favourites, restaurant } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;
        if (!favourites) return <Loading />;
        if (!restaurant) return <Loading />;
        console.log(restaurant)
        console.log(favourites)
        return (
            <FavouritesWraper>
                <H1>Twoje zapisane lokale</H1>
                <FavsWraper>
                    {this.action()}
                </FavsWraper>
            </FavouritesWraper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        favourites: state.firebase.profile.favourites,
        restaurant: state.firestore.ordered.restaurants,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'restaurants' }
    ])
)(Favourites);