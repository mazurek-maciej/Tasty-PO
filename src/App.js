import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from './components/Authentication/signIn';
import SignUp from './components/Authentication/signUp';
import Header from './components/Navbar/header';
import MainSite from './components/RestaurantDetails/mainSite';
import RestaurantDetails from './components/RestaurantDetails/restaurant_details';
import AddRestaurant from './components/RestaurantDetails/add_restaurant';
import Favourites from './components/Favourites/Favourites';
import Profile from './components/Profile';
import LogoutMain from './components/RestaurantDetails/logoutMain';
import Footer from './components/Footer';
import Layout from './components/Layout/layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={LogoutMain} />
              <Route path="/main" component={MainSite} />
              <Route path="/restaurant/:name" component={RestaurantDetails} />s
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profile" component={Profile} />
              <Route path="/favourites" component={Favourites} />
              <Route path="/add" component={AddRestaurant} />
            </Switch>
            <Footer />
          </>
        </BrowserRouter>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    restaurants: state.restaurant.restaurants,
  };
};

export default connect(mapStateToProps)(App);
