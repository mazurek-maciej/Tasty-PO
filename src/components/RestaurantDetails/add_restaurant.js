import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";
import { addRestaurant } from '../../store/actions/addActions';

class AddRestaurant extends Component {
    state = {
        title: '',
        address: '',
        phone: '',
        discount: '',
        dog: '',
        lat: '',
        lng: '',
        delivery: '',
        website: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRestaurant(this.state)
    }


    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;
        return (
            <div className='section'>
                <div className='container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <label className="label" htmlFor='title'>Nazwa</label>
                            <input className='input' type='text' id='title' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='phone'>Kontakt telefoniczny</label>
                            <input className='input' type='text' id='phone' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='discount'>Znizki studenckie</label>
                            <input className='checkbox' type='checkbox' id='discount' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='dog'>Mozliwosc przyjscia z psem</label>
                            <input className='checkbox' type='checkbox' id='dog' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='lat'>Lat</label>
                            <input className='input' type='text' id='lat' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='lng'>Lng</label>
                            <input className='input' type='text' id='lng' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='delivery'>Mozliwosc dowozu</label>
                            <input className='checkbox' type='checkbox' id='delivery' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='website'>Adres internetowy</label>
                            <input className='input' type='text' id='website' onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label className="label" htmlFor='address'>Adres</label>
                            <input className='input' type='text' id='address' onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button className='button'>Utwórz</button>
                        </div>
                    </form>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addRestaurant: (info) => dispatch(addRestaurant(info))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);