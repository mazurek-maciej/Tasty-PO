import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/layout';

// Baza danych / autentykacja
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getRestaurants } from '../../store/actions/restuarantActions';
import { addFavourites } from "../../store/actions/addFavouritesAction";

// Style
import styled from 'styled-components';
import Loading from '../Loading'

// Mapa
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapContainer = styled.div `
    height: 100vh;
    width: 100vw;
    background-color: ${({theme}) => theme.colors.$dark};
`;
const MarkerWraper = styled.div `
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
    shadowAnchor: [22, 94]
});
const H1 = styled.h1`
  color: ${({theme}) => theme.colors.$white};
  font-size: 3rem;
  font-weight: 300;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
  }
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
        zoom: 13,
        title: '',
        rating: 0,
        favs: [],
    };
    componentDidUpdate({ markerPosition }) {
        // check if position has changed
        if (this.props.markerPosition !== markerPosition) {
            this.marker.setLatLng(this.props.markerPosition);
        }
    }

    // Potrzebne przekierowanie do /main jeśli uzytkownik jest juz zalogowany


    render() {
        const { auth } = this.props;
        const position = [this.state.lat, this.state.lng];
        if (!this.props.restaurant) return <Loading/>;
        console.log(auth);
        return (
            <div>
                <HelloWraper>
                    <H1>Znajdź swój ulubiony lokal</H1>
                </HelloWraper>
                <Map style={{height: '60vh'}} center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {this.props.restaurant.map(res =>
                    <Marker
                        position={[res.lat, res.lng]}
                        icon={myIcon}
                        key={res.id}
                    >
                        <Popup>
                            <MarkerWraper>
                                <h2 className='subtitle'>
                                    {res.title}
                                </h2>
                                <div>
                                    <Link
                                        className='button is-info'
                                        to={{ pathname: `/restaurant/${res.id}`,
                                            state: {
                                                res: res,
                                            }}}
                                    >Sprawdź</Link>
                                </div>
                            </MarkerWraper>
                        </Popup>
                    </Marker>
                    )}
                </Map>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        restaurant: state.firestore.ordered.restaurants,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRestaurants: (restaurant) => dispatch(getRestaurants(restaurant)),
        addFavourites: (fav, id) => dispatch(addFavourites(fav, id))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'restaurants' }
    ])
)(MainSite)
