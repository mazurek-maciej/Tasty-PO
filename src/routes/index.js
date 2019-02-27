import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from '../App';
import RestaurantDetails from '../components/RestaurantDetails';
import SignIn from '../components/Authentication/signIn';
import SignUp from '../components/Authentication/signUp';
import AddRestaurant from '../components/RestaurantDetails/add_restaurant';

const Root = () => (
  <Router>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/restaurant/:name" component={RestaurantDetails} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/add" component={AddRestaurant} />
    </div>
  </Router>
);

export default Root;
