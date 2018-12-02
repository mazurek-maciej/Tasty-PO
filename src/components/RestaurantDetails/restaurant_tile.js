import React, { Component } from 'react'
import img from "../../images/img1.jpeg";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Map from '../map'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class RestaurantTile extends Component {
    render() {
        const { auth, restaurantName } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;

        return (
            <section className="section">
                <div className="container">
                <Map 
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8hRiRDW-V6iWz81B3ROPh5-ZjtTTEuPQ&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `80vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                        
                    />
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
