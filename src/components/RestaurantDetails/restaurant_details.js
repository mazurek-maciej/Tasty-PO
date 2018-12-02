import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RestaurantDetailsContent from './restaurant_details_content'
import Header from '../Navbar/header'


const RestaurantDetails = () => (
    <div className='container'>
        <Link className='button is-dark' to='/'><ion-icon name="arrow-back"></ion-icon>Powrót</Link>
        <RestaurantDetailsContent/>
    </div>
)

export default RestaurantDetails