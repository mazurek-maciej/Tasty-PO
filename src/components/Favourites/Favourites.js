import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Loading from '../Loading';
import TopContainer from './TopContainer';
import FavouritesList from './FavouritesList';
import posed from 'react-pose';

// Baza danych / autentykacja
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import styled from 'styled-components';

const PosedFavsWraper = posed.div({
  enter: {staggerChildren: 50},
});
const FavouritesWraper = styled(PosedFavsWraper)`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const FavsWraper = styled.div`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

class Favourites extends Component {
  state = {
    anim: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({anim: true});
    }, 300);
  }

  render() {
    const {auth, favourites, restaurant} = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!favourites) return <Loading />;
    if (!restaurant) return <Loading />;
    return (
      <FavouritesWraper>
        <TopContainer anim={this.state.anim} />
        <FavsWraper>
          <FavouritesList
            favourites={favourites}
            restaurant={restaurant}
            anim={this.state.anim}
          />
        </FavsWraper>
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
