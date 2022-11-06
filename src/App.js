import React from "react";
import {
  AboutUs,
  Bartender,
  FindUs,
  Footer,
  Gallery,
  Header,
  SpecialMenu, Booking
} from "./container";
import UserProvider from "./providers/UserProvider";
import { Navbar } from "./components";
import Reservation from "./components/ReservationManager/Reservation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Particless from "./components/Particless/Particless";
import CalendarUI from "./container/LayoutTesting/CalendarUI";

const App = () => (
  <Router>
    <UserProvider>
      <Routes>
        <Route path="/reservations" element={<Reservation />} />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Particless />
              <CalendarUI />
              <Header />
              <AboutUs />
              <SpecialMenu />
              <Bartender />
              <Gallery />
              <FindUs />
              <Footer />
              <Booking />
            </>
          }
        />
      </Routes>
    </UserProvider>
  </Router>
);

export default App;
