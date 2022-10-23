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
import UserProvider from "./providers/UserProvider";
import { Navbar } from "./components";
import Reservation from "./components/ReservationManager/Reservation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Particless from "./components/Particless/Particless";

const App = () => (
  <Router>
    <UserProvider>
      <Routes>
        <Route path="/reservations" element={<Reservation />} />
        <Route
          path="/"
          element={
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
          }
        />
      </Routes>
    </UserProvider>
  </Router>
);

export default App;
