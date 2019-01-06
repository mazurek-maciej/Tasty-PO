import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import img from "../../images/img1.jpeg";
import Loading from '../Loading'
import {addFavourites} from "../../store/actions/addFavouritesAction";

const RestaurantWraper = styled.div`
  width: 100vw;
  height: 80vh;
`;

class RestaurantDetails extends Component {
    state = {
        active: '',
        favs: 0,
    };
    handleState = () => {
        this.setState({active: 'active'})
    };

    handleClick = (e, id) => {
        this.props.addFavourites(e, id);

    };


    render() {
        const { auth, restaurant, favourites, location } = this.props;
        if (!location.state) return <Loading/>;
        if (!auth.uid) return this.handleState();
        const place = this.props.location.state.res;
        const id = this.props.auth.uid;
        console.log(this.props)
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
            </RestaurantWraper>

        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        restaurant: state.firestore.ordered.restaurants,
        favourites: state.firebase.profile.favourites,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFavourites: (fav, id) => dispatch(addFavourites(fav, id))
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'restaurants' }
    ])
)(RestaurantDetails);