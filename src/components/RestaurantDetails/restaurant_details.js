import React, {Component} from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import CommentForm from './commentForm';
import img from '../../images/img1.jpeg';
import Loading from '../Loading';
import {addRatingToRestaurant} from '../../store/actions/addRatingToRestaurant';
import {addRatingToUserProfile} from '../../store/actions/addRatingToUserProfile';
import {ArrowLeft} from 'styled-icons/feather/ArrowLeft';

const AllWraper = styled.div`
  height: fit-content;
  @media (min-width: 320px) and (max-width: 480px) {
    height: fit-content;
  }
`;
const RestaurantWraper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RatingWraper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  text-align: center;
  padding-bottom: 2rem;
  * > h2 {
    font-size: 2rem;
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
  transition: all 0.2s;
  :hover {
    transform: translateX(-20%);
  }
`;
const Wraper = styled.div`
  width: 100vw;
  display: ${props => (props.disp ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;
const RatingStar = styled.button`
  flex: 1;
  margin: 1rem;
  padding: 20px 30px;
  border: 1px solid ${({theme}) => theme.colors.$primary};
  color: ${({theme}) => theme.colors.$white};
  font-size: 2rem;
  border-radius: 100%;
  background: transparent;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  :hover {
    background-color: ${({theme}) => theme.colors.$primary};
    color: ${({theme}) => theme.colors.$dark};
  }
  :active {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
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
  },
});
const PopUp = styled(PosedPopUp)`
  display: ${props => (props.pop ? 'flex' : 'none')};
  height: 90vh;
  width: 100vw;
  z-index: 999999;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 2.5rem;
  color: ${({theme}) => theme.colors.$white};
  background-color: rgba(0, 0, 0, 0.8);
`;
const PopUpWraper = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 1rem;
  }
  h2 {
    margin: 1rem;
  }
`;
const H1 = styled.h1`
  color: ${({theme}) => theme.colors.$white};
  font-size: 3rem;
  text-align: center;
`;
const RestaurantImage = styled.img`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
`;
const InfoWraper = styled.div`
  color: ${({theme}) => theme.colors.$white};
  font-size: 1.5rem;
  margin-top: 1rem;
  p,
  a {
    color: ${({theme}) => theme.colors.$primary};
    margin: 0 0 4px 1rem;
  }
  h2 {
    display: flex;
    a:hover {
      color: ${({theme}) => theme.colors.$white};
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
  }
`;

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.checkIfUserRateThisLocation = this.checkIfUserRateThisLocation.bind(
      this,
    );
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
    const {auth, restaurant, favourites, location, profile} = this.props;
    const {activeRatings, popUp} = this.state;

    if (!location.state) return <Loading />;
    if (!restaurant) return <Loading />;
    if (!profile) return <Loading />;
    if (!auth.uid) return this.handleState();

    const place = this.props.location.state.res;
    const restaurantIdFromUserProfile = profile.userRatings.find(
      id => id === location.state.res.id,
    );
    console.log(restaurantIdFromUserProfile);
    console.log(place);

    return (
      <>
        <PopUp pose={popUp ? 'visible' : 'hidden'} pop={popUp}>
          <PopUpWraper>
            <h2>Dziękujemy za ocenę</h2>
            <button onClick={this.handlePopUp} className="button is-danger">
              X
            </button>
          </PopUpWraper>
        </PopUp>
        <AllWraper>
          <RestaurantWraper>
            <div className="section">
              <div>
                <BackButton to="/main">
                  <ALeft />
                </BackButton>
              </div>
              <H1>{place.title}</H1>
              <div>
                <RestaurantImage src={img} alt="" />
              </div>
              <InfoWraper>
                <h2>
                  Adres: <p a>{place.address}</p>
                </h2>
                <h2>
                  Telefon: <p>{place.phone}</p>
                </h2>
                <h2>
                  Możliwość przyjścia z psem: <p>{place.dog ? 'Tak' : 'Nie'}</p>
                </h2>
                <h2>
                  Zniżki studenckie: <p>{place.discount ? 'Tak' : 'Nie'}</p>
                </h2>
                <h2>
                  Dowóz: <p>{place.delivery ? 'Tak' : 'Nie'}</p>
                </h2>
                <h2>
                  Strona internetowa:{' '}
                  <a a href={place.website}>
                    {place.title}
                  </a>
                </h2>
              </InfoWraper>
            </div>

            <Wraper disp={!restaurantIdFromUserProfile}>
              <RatingWraper>
                <div>
                  <h2>Jak oceniasz tą restauracje?</h2>
                </div>
                <div>
                  <RatingStar
                    onClick={() =>
                      this.handleRatingClick(1, place.id, auth.uid)
                    }
                  >
                    1
                  </RatingStar>

                  <RatingStar
                    onClick={() =>
                      this.handleRatingClick(2, place.id, auth.uid)
                    }
                  >
                    2
                  </RatingStar>

                  <RatingStar
                    onClick={() =>
                      this.handleRatingClick(3, place.id, auth.uid)
                    }
                  >
                    3
                  </RatingStar>

                  <RatingStar
                    onClick={() =>
                      this.handleRatingClick(4, place.id, auth.uid)
                    }
                  >
                    4
                  </RatingStar>

                  <RatingStar
                    onClick={() =>
                      this.handleRatingClick(5, place.id, auth.uid)
                    }
                  >
                    5
                  </RatingStar>
                </div>
              </RatingWraper>
            </Wraper>
          </RestaurantWraper>
          <CommentForm restId={place.id} />
        </AllWraper>
      </>
    );
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
  }
  //

  // Sprawdzenie czy lokal zostal oceniony
  checkIfUserRateThisLocation() {
    if (this.props.profile) {
      const restId = this.props.location.state.res.id;
      const restaurantIdFromUserProfile = this.props.profile.userRatings.find(
        id => id === restId,
      );
      if (!restaurantIdFromUserProfile) {
        this.setState({activeRatings: true});
      }
    }
  }

  handlePopUp() {
    this.setState(prevState => ({popUp: !prevState.popUp}));
  }

  handleState = () => {
    this.setState({active: 'active'});
  };
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    restaurant: state.firestore.ordered.restaurants,
    favourites: state.firebase.profile.favourites,
    ratesFromProfile: state.firebase.profile.userRatings,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRatingToRestaurant: (rate, count, id) =>
      dispatch(addRatingToRestaurant(rate, count, id)),
    addRatingToUserProfile: (restaurantId, userId) =>
      dispatch(addRatingToUserProfile(restaurantId, userId)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{collection: 'restaurants'}]),
)(RestaurantDetails);
