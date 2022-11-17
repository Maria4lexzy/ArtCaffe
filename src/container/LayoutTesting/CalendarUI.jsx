import React from "react";
import { sendEmail } from "../../firebase";
import "./CalendarUI.scss";
import ReserveTable from "../../components/Reservation/ReserveTable";
const CalendarUI = () => {
  const handleClick = (e) => {
    sendEmail({
      name: "Test",
      email: "jakub.piga.cp@gmail.com",
      phone: "phone",
      tables: "T4,T5",
      date: new Date(),
    }).then((result) => {
      // Read result of the Cloud Function.
      console.log(result);
    });
  };
  return (
    <div className="app__calendarui ">
      <ReserveTable />
      <button onClick={(e) => handleClick(e)}>SendFunction</button>
    </div>
  );
};
export default CalendarUI;
