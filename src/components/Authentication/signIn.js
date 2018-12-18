import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import Layout from "../Layout/layout";

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/main' />;

        return (
            <Layout>
                <div className='section'>
                    <div className="container">
                        <div className="columns">
                            <div className="column is-7">
                                <form onSubmit={this.handleSubmit}>
                                    <h3 className='subtitle'>Zaloguj się</h3>
                                    <div className='field'>
                                        <label className='label' htmlFor="email">Email</label>
                                        <input className='input' type="email" id='email' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <label className='label' htmlFor="password">Hasło</label>
                                        <input className='input' type="password" id='password' onChange={this.handleChange}/>
                                    </div>
                                    <div className='field'>
                                        <button className='button is-success'>Zaloguj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div>
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);