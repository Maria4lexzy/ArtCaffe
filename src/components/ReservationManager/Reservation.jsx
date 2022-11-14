import React, { useContext } from "react";
import "./Reservation.scss";
import { BsBoxArrowInRight } from "react-icons/bs";
import { UserContext } from "../../providers/UserProvider";
import SignInPage from "./SignInPage";
import { signOutUser } from "../../firebase";
import Calendar from "../Calendar/Calendar";
import OpeningHSchedule from "../Calendar/OpeningHSchedule";
import SubHeading from "../SubHeading/SubHeading";
const Reservation = () => {
  const user = useContext(UserContext);

  async function handleLogOut(e) {
    e.preventDefault();
    signOutUser();
  }
  return user ? (
    <div className="app__reservation  ">
      <div className="app__reservation--logout">
        <BsBoxArrowInRight
          onClick={handleLogOut}
          className="app__reservation--logout-icon custom__button"
        />
      </div>
      <div className="app__reservation--title">
        <SubHeading title="A way to manage your day" />
        {/* <h1 className="headtext__cormorant">Admin Page</h1> */}
      </div>

      <div className="app__reservation--calendar">
        <Calendar />
      </div>
      <div className="app__reservation--schedule">
        <OpeningHSchedule />
      </div>
    </div>
  ) : (
    <SignInPage />
  );
};

export default Reservation;
