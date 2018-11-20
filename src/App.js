import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/Authentication/signIn'
import SignUp from './components/Authentication/signUp'
import Header from './components/Navbar/header';
import RestaurantTile from './components/RestaurantDetails/restaurant_tile';

class App extends Component {

  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Switch>
              <Route exact path='/' component={RestaurantTile} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
          </Switch>
      </div>
    </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurant.restaurants
    }
};

export default connect(mapStateToProps)(App);
