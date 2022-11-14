import React, { createRef } from "react";
import { pics } from "../../constants";
import "./ReservationSheet.scss";
import Sheet from "react-modal-sheet";
import { useState } from "react";
import SubHeading from "../SubHeading/SubHeading";
import { useTranslation } from "react-i18next";

const datepickerRef = createRef();
var rdated_data = '"10-10-2022", "11-10-2022", "20-10-2022"';

const ReservationSheet = ({ handleOpenClose }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState("");
  const [isOpen, setOpen] = useState(false);
  let selectedDate = 0;
  let currentDate = new Date();

  let selectedDateWithCurrentTime = new Date();
  const openClose = () => {
    setOpen(handleOpenClose);
    console.log(handleOpenClose);
  };
  return (
    <div className="app__reservationsheet">
      <Sheet
        isOpen={openClose}
        onClose={() => {
          setOpen(false);
          handleOpenClose();
        }}
        // detent="content-height"
      >
        <Sheet.Container className="react-modal-sheet-container">
          <Sheet.Header className="react-modal-sheet-container" />
          <Sheet.Content>
            {/* Your sheet content goes here */}
            <div className="app__reservationsheet">
              <div className="app__modalsheet-heading">
                <SubHeading title="Create ss Reservation Reservation" />
              </div>
              <div className="app__newsletter-input flex__center">
                <input type="email" placeholer="example@gmail.com"></input>
                <button className="custom__button">Subscribe</button>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default ReservationSheet;
