import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// Baza danych / autentykacja
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getRestaurants } from '../../store/actions/restuarantActions';

// Style
import styled from 'styled-components';

// Mapa
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapContainer = styled.div `
    .leaflet-pane .leaflet-marker-pane {
        background-color: red
    }
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

class RestaurantTile extends Component {
    state = {
        lat: 50.674577,
        lng: 17.918693,
        zoom: 13,
        title: '',
        rating: 0
      }
    componentDidUpdate({ markerPosition }) {
    // check if position has changed 
    if (this.props.markerPosition !== markerPosition) {
        this.marker.setLatLng(this.props.markerPosition);
    }
    }
    render() {
        const { auth, restaurant } = this.props;
        const position = [this.state.lat, this.state.lng]
        if (!auth.uid) return <Redirect to='/signin' />;
        if (!this.props.restaurant) return <div>Loading</div>
        
        return (
            <section className="section">
                <div className="container">
                <MapContainer>
                    <Map style={{height: '600px'}} center={position} zoom={this.state.zoom}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />

                        {this.props.restaurant.map(res => 
                            <Marker 
                                position={[res.lat, res.lng]}
                                icon={myIcon}
                                >
                                <Popup>
                                <MarkerWraper>
                                    <h2 className='subtitle'>
                                        {res.title}
                                    </h2>
                                    <div>
                                        <Link className='button is-info' to={{ pathname: `/restaurant/${res.title}`, state: res }}>Sprawdź</Link>
                                    </div>
                                </MarkerWraper>
                                </Popup>
                            </Marker>
                        )}

                    </Map>
                </MapContainer>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.firestore.ordered.restaurants)
    return {
        auth: state.firebase.auth,
        restaurant: state.firestore.ordered.restaurants
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRestaurants: (restaurant) => dispatch(getRestaurants(restaurant))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'restaurants' }
    ])
    )(RestaurantTile)
