import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App'
import RestaurantDetails from '../components/RestaurantDetails/restaurant_details'
import SignIn from '../components/Authentication/signIn'
import SignUp from '../components/Authentication/signUp'

const Root= () => (
    <Router>
        <div>
            <Route path='/' exact component={App}/>
            <Route path='/restaurant/:name' component={RestaurantDetails} />
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </div>
    </Router>
);

export default Root;