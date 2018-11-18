import React from 'react'
import { Link } from 'react-router-dom'
import RestaurantDetailsContent from './restaurant_details_content'
import Header from '../Navbar/header'


const RestaurantDetails = () => (
    <div>
        <Header/>
        <Link to='/'>Powrót</Link>
        <RestaurantDetailsContent/>
    </div>
)

export default RestaurantDetails