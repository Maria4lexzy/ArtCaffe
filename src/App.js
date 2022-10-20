import React from "react";

import {
  AboutUs,
  Bartender,
  FindUs,
  Footer,
  Gallery,
  Header,
  SpecialMenu,

} from "./container";

import { Navbar } from "./components";
import "./App.scss";
import Particless from "./components/Particless/Particless";

const App = () => (
  <div>
    <Navbar />
    <Particless />
    <Header />
    <AboutUs />
    <SpecialMenu />
    <Bartender />
    <Gallery />
    <FindUs />
    <Footer />
  </div>
);

export default App;
