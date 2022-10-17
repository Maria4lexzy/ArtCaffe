import React from 'react';

import { AboutUs, Bartender, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div>
    <Navbar />
    <Header />
    <AboutUs />
    <SpecialMenu />
    <Bartender />
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <Footer />
  </div>
);

export default App;
