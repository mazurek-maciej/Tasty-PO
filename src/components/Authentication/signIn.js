import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {signIn} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import Layout from '../Layout/layout';

const Wraper = styled.div`
  width: 100vw;
  height: 80vh;
  h3 {
    font-weight: 600;
  }
`;
const Error = styled.p`
  color: ${({theme}) => theme.colors.$primary};
`;

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {authError, auth} = this.props;
    if (auth.uid) return <Redirect to="/main" />;

    return (
      <Layout>
        <Wraper>
          <div className="section">
            <div className="container">
              <div className="columns">
                <div className="column is-7">
                  <form onSubmit={this.handleSubmit}>
                    <h3 className="subtitle">Zaloguj się</h3>
                    <div className="field">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="input"
                        type="email"
                        id="email"
                        placeholder="Podaj swój email"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="password">
                        Hasło
                      </label>
                      <input
                        className="input"
                        type="password"
                        id="password"
                        placeholder="Podaj swoje hasło"
                        onChange={this.handleChange}
                      />
                    </div>
                    <Error>
                      {authError ? <Error>{authError}</Error> : null}
                    </Error>
                    <div className="field">
                      <button className="button is-success">Zaloguj</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Wraper>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
