import React, { useRef } from "react";

import "./CalendarUI.scss";
import ReserveTable from "../../components/Reservation/ReserveTable";

const CalendarUI = () => {
  return (
    <div className="app__calendarui ">
      <ReserveTable />
    </div>
  );
};
export default CalendarUI;
