import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import img from "../../images/img1.jpeg";
import Loading from '../Loading'
import { addRatingToRestaurant } from "../../store/actions/addRatingToRestaurant";
import { addRatingToUserProfile } from "../../store/actions/addRatingToUserProfile";

const RestaurantWraper = styled.div`
  width: 100vw;
  height: 80vh;
`;
const Wraper = styled.div `
    width: 100vw;
    display: ${props => props.disp ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`
const RatingWraper = styled.div `
    display: flex;
    flex-direction: column;
    max-width: 900px;
    text-align: center;
    * > h2 {
        font-size: 3rem;
        color: ${({theme}) => theme.colors.$white};
    }
`
const RatingStar = styled.button `
    flex: 1;
    margin: 1rem;
    padding: 2rem;
    border: 1px solid ${({theme}) => theme.colors.$primary};
    color: ${({theme}) => theme.colors.$white};
    font-size: 2rem;
    border-radius: 2rem;
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
`

class RestaurantDetails extends Component {
    state = {
        active: '',
        favs: 0,
        rating: 0,
        count: 0,
        activeRatings: ''
    };

    componentDidMount() {
        setTimeout(this.ratingStarHandler, 500);
        setTimeout(this.checkIfUserRateThisLocation, 500);

    }

    
    render() {

        const { auth, restaurant, favourites, location, profile } = this.props;
        const { rating, count, activeRatings } = this.state;

        if (!location.state && !restaurant) return <Loading/>;
        if (!auth.uid) return this.handleState();

        const place = this.props.location.state.res;
        const id = this.props.auth.uid;
        

        // console.log(place.id)
        console.log(this.props.location.state.res)

        return (
            <RestaurantWraper>
                <div className='container'>
                    <Link className='button is-dark' to='/main'><ion-icon name="arrow-back"></ion-icon>Powrót</Link>
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
                <Wraper disp={activeRatings ? true : false}>
                    <RatingWraper>
                        <div>
                            <h2>Oceń restauracje</h2>
                        </div>
                        <div>
                            <RatingStar 
                            onClick={() => this.handleRatingClick(1, count, place.id, auth.uid)}
                            >
                            1</RatingStar>

                            <RatingStar
                            onClick={() => this.handleRatingClick(2, count, place.id, auth.uid)}
                            >
                            2</RatingStar>

                            <RatingStar
                            onClick={() => this.handleRatingClick(3, count, place.id, auth.uid)}
                            >
                            3</RatingStar>

                            <RatingStar
                            onClick={() => this.handleRatingClick(4, count, place.id, auth.uid)}
                            >
                            4</RatingStar>

                            <RatingStar
                            onClick={() => this.handleRatingClick(5, count, place.id, auth.uid)}
                            >
                            5</RatingStar>
                        </div>
                    </RatingWraper>
                </Wraper>
            </RestaurantWraper>

        )
    }

    handleRatingClick = (rate, count, id, userId) => {
        const incrementedCount = count + 1;
        const incrementedRating = this.state.rating + rate;
        this.props.addRatingToRestaurant(incrementedRating, incrementedCount, id);
        this.props.addRatingToUserProfile(id, userId)
        this.ratingStarHandler();
    };

    ratingStarHandler = () => {
        if (this.props.restaurant) {
            const locationId = this.props.location.state.res.id;
            const name = this.props.restaurant.find(r => r.id === locationId)
            this.setState({ 
                rating: name.rating,
                count: name.ratingCount
            })
        }
    }

    checkIfUserRateThisLocation = () => {
        if (this.props.profile) {
            const restId = this.props.location.state.res.id;
            const restaurantIdFromUserProfile = this.props.profile.userRatings.find(id => id === restId)
            if (!restaurantIdFromUserProfile) {
                this.setState({ activeRatings: 'active'})
            }
        }
    }

    handleState = () => {
        this.setState({active: 'active'})
    };



}


// TO-DO: Osobne pobieranie informacje o restauracji

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