import React, { Component } from 'react'
import styled from 'styled-components'
import posed from 'react-pose';
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import img from "../../images/img1.jpeg";
import Loading from '../Loading'
import { addRatingToRestaurant } from "../../store/actions/addRatingToRestaurant";
import { addRatingToUserProfile } from "../../store/actions/addRatingToUserProfile";
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft'

const RestaurantWraper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const RatingWraper = styled.div `
    display: flex;
    flex-direction: column;
    max-width: 900px;
    text-align: center;
    padding-bottom: 2rem;
    * > h2 {
        font-size: 3rem;
        color: ${({theme}) => theme.colors.$white};
    }
    @media (min-width: 320px) and (max-width: 480px) {
      h2 {
        font-size: 1.5rem;
      }
    }
`;
const BackButton = styled(Link)`
  padding: 1rem;
  text-align: center;
`;
const ALeft = styled(ArrowLeft)`
  color: ${({theme}) => theme.colors.$white};
  width: 2rem;
  transition: all .2s;
  :hover {
    transform: translateX(-20%);
  }
`;
const Wraper = styled.div `
    width: 100vw;
    display: ${props => props.disp ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`;
const RatingStar = styled.button `
    flex: 1;
    margin: 1rem;
    padding: 20px 30px;
    border: 1px solid ${({theme}) => theme.colors.$primary};
    color: ${({theme}) => theme.colors.$white};
    font-size: 2rem;
    border-radius: 100%;
    background: transparent;
    box-shadow: 0 0 20px 0 rgba(0,0,0, .4);
    transition: all 0.2s;
    :hover {
        background-color: ${({theme}) => theme.colors.$primary};
        color: ${({theme}) => theme.colors.$dark}
    };
    :active {
        box-shadow: 0 0 20px 0 rgba(0,0,0, .8);
    }
    @media (min-width: 320px) and (max-width: 480px) {
      font-size: 1rem;
      padding: 10px 15px;
    }
`;
const PosedPopUp = posed.div({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  }
});
const PopUp = styled(PosedPopUp)`
  display: ${props => props.pop ? 'flex' : 'none'};
  height: 90vh;
  width: 100vw;
  z-index: 999999;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 2.5rem;
  color: ${({theme}) => theme.colors.$white};
  background-color: rgba(0,0,0, .8);
`;
const PopUpWraper = styled.div`
  display: flex;
  align-items: center;
  button { margin: 1rem }
  h2 { margin: 1rem }
`;

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.checkIfUserRateThisLocation = this.checkIfUserRateThisLocation.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handlePopUp = this.handlePopUp.bind(this);
    this.state = {
      active: '',
      favs: 0,
      activeRatings: false,
      popUp: false,
    };
  }

  componentDidMount() {
    setTimeout(this.checkIfUserRateThisLocation, 800);
  }

  render() {

    const { auth, restaurant, favourites, location, profile } = this.props;
    const { activeRatings, popUp } = this.state;

    if (!location.state) return <Loading/>;
    if (!restaurant) return <Loading/>;
    if (!profile) return <Loading/>;
    if (!auth.uid) return this.handleState();

    const place = this.props.location.state.res;
    const restaurantIdFromUserProfile = profile.userRatings.find(id => id === location.state.res.id);
    console.log(restaurantIdFromUserProfile);
    console.log(popUp)

    return (
      <>
      <PopUp
        pose={popUp ? 'visible' : 'hidden'}
        pop={popUp}>
        <PopUpWraper>
          <h2>Dziękujemy za ocenę</h2>
          <button onClick={this.handlePopUp} className='button is-danger'>X</button>
        </PopUpWraper>
      </PopUp>

      <RestaurantWraper>
        <div className='section'>
          <div>
            <BackButton to='/main'><ALeft/></BackButton>
          </div>
          {/*<button onClick={() => this.handleClick(place.id, id) } className='button'>Fav</button>*/}
          <div className="tile is-ancestor">
            <div className="tile is-vertical ">
              <div className="tile">
                <div className="tile is-parent">
                  <img src={img} alt='lokal'/>
                </div>
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification">
                    <p className="title">{place.title}</p>
                  </article>
                  <article className="tile is-child notification">
                    <p>Adres</p>
                    <p className="title">{place.address}</p>
                  </article>
                  <article className="tile is-child notification">
                    <p>Kontakt telefoniczny</p>
                    <p className="title">{place.phone}</p>
                  </article>
                  <article className="tile is-child notification">
                    <p>Adres internetowy</p>
                    <p className="title">{place.website}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Wraper disp={!restaurantIdFromUserProfile}>
          <RatingWraper>
            <div>
              <h2>Oceń restauracje</h2>
            </div>
            <div>
              <RatingStar
                onClick={() => this.handleRatingClick(1, place.id, auth.uid)}
              >
                1</RatingStar>

              <RatingStar
                onClick={() => this.handleRatingClick(2, place.id, auth.uid)}
              >
                2</RatingStar>

              <RatingStar
                onClick={() => this.handleRatingClick(3, place.id, auth.uid)}
              >
                3</RatingStar>

              <RatingStar
                onClick={() => this.handleRatingClick(4, place.id, auth.uid)}
              >
                4</RatingStar>

              <RatingStar
                onClick={() => this.handleRatingClick(5, place.id, auth.uid)}
              >
                5</RatingStar>
            </div>
          </RatingWraper>
        </Wraper>
      </RestaurantWraper>
      </>
    )
  }

  // Ocenianie
  handleRatingClick(rate, id, userId) {
    const locationId = this.props.location.state.res.id;
    const name = this.props.restaurant.find(r => r.id === locationId);
    const incrementedCount = name.ratingCount + 1;
    const incrementedRating = name.rating + rate;
    this.props.addRatingToRestaurant(incrementedRating, incrementedCount, id);
    this.props.addRatingToUserProfile(id, userId);
    this.checkIfUserRateThisLocation();
    this.handlePopUp();
  };
  //

  // Sprawdzenie czy lokal zostal oceniony
  checkIfUserRateThisLocation() {
    if (this.props.profile) {
      const restId = this.props.location.state.res.id;
      const restaurantIdFromUserProfile = this.props.profile.userRatings.find(id => id === restId);
      if (!restaurantIdFromUserProfile) {
        this.setState({ activeRatings: true})
      }
    }
  };

  handlePopUp() {
    this.setState(prevState => ({ popUp: !prevState.popUp}));
  }

  handleState = () => {
    this.setState({active: 'active'})
  };

}


const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    restaurant: state.firestore.ordered.restaurants,
    favourites: state.firebase.profile.favourites,
    ratesFromProfile: state.firebase.profile.userRatings,
    profile: state.firebase.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRatingToRestaurant: (rate, count, id) => dispatch(addRatingToRestaurant(rate, count, id)),
    addRatingToUserProfile: (restaurantId, userId) => dispatch(addRatingToUserProfile(restaurantId, userId)),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'restaurants' }
  ])
)(RestaurantDetails);