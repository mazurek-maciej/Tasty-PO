import React, { Component } from 'react';

import Header from './components/Navbar/header'
import RestaurantTile from './components/RestaurantDetails/restaurant_tile'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <section className='section'>
            <RestaurantTile restaurantName='mcdonalds'/>
            <RestaurantTile restaurantName='kfc'/>
            <RestaurantTile restaurantName='taco loco'/>
        </section>
      </div>
    );
  }
}

export default App;
