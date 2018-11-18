import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App'
import RestaurantDetails from '../components/RestaurantDetails/restaurant_details'

const Root= () => (
    <Router>
        <div>
            <Route path='/' exact component={App}/>
            <Route path='/restaurant/:name' component={RestaurantDetails} />
        </div>
    </Router>
)

export default Root;