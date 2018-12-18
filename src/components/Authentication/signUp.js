import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import Layout from "../Layout/layout";


class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        surname: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    render() {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/main' />;

        return (
            <Layout>
                <div className="section">
                    <div className='container'>
                        <div className="columns">
                            <div className="column is-7">
                                <form onSubmit={this.handleSubmit}>
                                    <h3 className='subtitle'>Zarejestruj się</h3>
                                    <div className='field'>
                                        <label className='label' htmlFor="password">Imię</label>
                                        <input className='input' type="text" id='name' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <label className='label' htmlFor="password">Nazwisko</label>
                                        <input className='input' type="text" id='surname' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <label className='label' htmlFor="email">Email</label>
                                        <input className='input' type="email" id='email' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <label className='label' htmlFor="password">Hasło</label>
                                        <input className='input' type="password" id='password' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <button className='button is-success'>Rejestracja</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);