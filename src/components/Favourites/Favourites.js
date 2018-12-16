import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

// Baza danych / autentykacja
import { connect } from 'react-redux';



class Favourites extends Component {
    render() {
        const { auth, favourites } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;
        if (!favourites) return <Loading />;
        return (
            <div>
                {favourites.map(fav => (
                    <li>{fav}</li>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        favourites: state.firebase.profile.favourites
    }
};

export default connect(mapStateToProps)(Favourites);