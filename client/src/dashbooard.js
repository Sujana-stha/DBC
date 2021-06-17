// App.js

import React, { Component } from 'react';
import Header from './components/dashboard-layout/header';
import SideBar from './components/dashboard-layout/SideBar';
import Content from './components/dashboard';
import Footer from './components/dashboard-layout/footer';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <SideBar />
        <div className="content-wrapper">
          <section className="content">
          <Content />
          </section>
        </div>
        
        <Footer/>
      </div>
    );
  }
}

export default App;