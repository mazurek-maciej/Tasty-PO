import React, { Component } from 'react';

import Header from './components/header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className='ui container'>
            <div class="ui one cards">
              <a class="red card">
                cos tam
              </a>
              <a class="green card">
                content
              </a>
              <a class="yellow card">
                content
              </a>
              <a class="blue card">
                content
              </a>
            </div>
        </section>
      </div>
    );
  }
}

export default App;
