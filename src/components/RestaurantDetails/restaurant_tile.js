import React, { Component } from 'react'
import img from "../../images/img1.jpeg";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import shadowIcon from 'leaflet/dist/images/marker-shadow.png'

const MapContainer = styled.div `
    .leaflet-pane .leaflet-marker-pane {
        background-color: red
    }
`;
const MarkerWraper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end
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
      }
    componentDidUpdate({ markerPosition }) {
    // check if position has changed 
    if (this.props.markerPosition !== markerPosition) {
        this.marker.setLatLng(this.props.markerPosition);
    }
    }
    render() {
        const { auth, restaurantName } = this.props;
        const position = [this.state.lat, this.state.lng]
        if (!auth.uid) return <Redirect to='/signin' />;

        return (
            <section className="section">
                <div className="container">
                <MapContainer>
                    <Map style={{height: '600px'}} center={position} zoom={this.state.zoom}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker 
                        position={position}
                        icon={myIcon}
                        >
                        <Popup>
                        <MarkerWraper>
                            <h2 className='subtitle'>
                                Check out this awesome restaurant!
                            </h2>
                            <div>
                                <Link className='button is-info' to='/restaurant/kfc'>Check</Link>
                            </div>
                        </MarkerWraper>
                        </Popup>
                        </Marker>
                    </Map>
                </MapContainer>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    )(RestaurantTile)
