import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import RestaurantDetailsContent from './restaurant_details_content'
import img from "../../images/img1.jpeg";


class RestaurantDetails extends Component {
    render() {
        if (!this.props.location.state) return <div>Loading</div>
        console.log(this.props.location.state)
        const place = this.props.location.state
        return (
            <div className='container'>
                <Link className='button is-dark' to='/'><ion-icon name="arrow-back"></ion-icon>Powrót</Link>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical ">
                        <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-warning">
                            <p className="title">{place.title}</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                            <p className="title">{place.address}</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                            <p className="title">{place.phone}</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                            <p className="title">{place.website}</p>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <img src={img} alt='lokal'/>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>

        )
    }
}


export default RestaurantDetails;