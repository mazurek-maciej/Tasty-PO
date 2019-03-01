import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import SignIn from '../components/Authentication/signIn';
import SignUp from '../components/Authentication/signUp';
import Header from '../components/Navbar/header';
import MainSite from '../components/Main/mainSite';
import RestaurantDetails from '../components/RestaurantDetails';
import AddRestaurant from '../components/RestaurantDetails/add_restaurant';
import Favourites from '../components/Favourites/Favourites';
import Profile from '../components/Profile';
import LogoutMain from '../components/MainLoggedOff/logoutMain';

const PosedRoutes = posed.div({
  enter: {opacity: 1, delay: 300, beforeChildren: true},
  exit: {opacity: 0},
});

const Root = () => (
  <Router>
    <>
      <Header />
      <Route
        render={({location}) => (
          <PoseGroup>
            <PosedRoutes key={location.pathname}>
              <Switch location={location}>
                <Route exact path="/" component={LogoutMain} />
                <Route path="/main" component={MainSite} />
                <Route path="/restaurant/:name" component={RestaurantDetails} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={Profile} />
                <Route path="/favourites" component={Favourites} />
                <Route path="/add" component={AddRestaurant} />
              </Switch>
            </PosedRoutes>
          </PoseGroup>
        )}
      />
    </>
  </Router>
);

export default Root;
