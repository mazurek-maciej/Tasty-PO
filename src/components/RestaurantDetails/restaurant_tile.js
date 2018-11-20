import React, { Component } from 'react'
import img from "../../images/img1.jpeg";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class RestaurantTile extends Component {
    render() {
        const { auth, restaurantName } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;

        return (
            <div className="container">
                <div className="box">
                    <div className="tile is-ancestor">
                        <div className="tile is-vertical is-8">
                            <div className="tile is-parent">
                                <article className="tile is-child notification is-danger">
                                    <img src={img} alt="mcdonalds"/>
                                </article>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-danger">
                                <div className="content">
                                    <h2>{restaurantName}</h2>
                                    <h3>Godziny otwarcia</h3>
                                    <h3>Adres</h3>
                                    <Link className='button' to={`/restaurant/${restaurantName}`}>Szczegóły</Link>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
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
