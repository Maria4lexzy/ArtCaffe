import React, { useState, useEffect } from "react";
import "./Calendar.css";
import CalendarMonthView from "./CalendarMonthView";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {
  currentDateAction,
  fistDateInWeekAction,
  dayDisplayedAction,
} from "../../redux/CalendarSlice";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getFirstDateFromWeekNo } from "../../utils/calendar";
import { generateMonthOpeningHours } from "../../firebase";

export default function Calendar() {
  const { loading, date, calendarTitle } = useSelector(
    (state) => state.calendar
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let today = new Date();
    let firstDayInMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    dispatch(currentDateAction({ newDate: firstDayInMonth.toString() }));
    let weekNumber = today.getWeekNumber();

    dispatch(
      fistDateInWeekAction({
        newWeekDate: getFirstDateFromWeekNo(
          weekNumber,
          today.getFullYear()
        ).toString(),
      })
    );
    //eslint-disable-next-line
  }, []);

  const prevBtn = () => {
    monthViewChange(false);
  };

  const nextBtn = () => {
    monthViewChange(true);
  };
  const todayBtn = () => {
    let today = new Date();
    let firstDayInMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    dispatch(currentDateAction({ newDate: firstDayInMonth.toString() }));
    let weekNumber = today.getWeekNumber();
    let firstDayInweek = getFirstDateFromWeekNo(
      weekNumber,
      today.getFullYear()
    );
    dispatch(fistDateInWeekAction({ newWeekDate: firstDayInweek.toString() }));
    dispatch(dayDisplayedAction({ newDayDisplayed: new Date().toString() }));
  };
  const toogleLoading = () => {
    setOpen(!open);
  };

  const monthViewChange = (type) => {
    //true next button was pressed
    if (type) {
      let updatedDate = new Date(date);
      updatedDate.setDate(1);
      updatedDate.setMonth(new Date(date).getMonth() + 1);
      dispatch(currentDateAction({ newDate: updatedDate.toString() }));
      // fetchMonth(updatedDate);
    } else {
      let updatedDate = new Date(date);
      updatedDate.setDate(1);
      updatedDate.setMonth(new Date(date).getMonth() - 1);
      dispatch(currentDateAction({ newDate: updatedDate.toString() }));
      // fetchMonth(updatedDate);
    }
  };
  return (
    <>
      {/* Calendar Tools */}
      <Container>
        <div className="calendar-tools">
          <div className="row text-center ">
            <div className="col-12 ">
              <div className="row">
                <div className="col-2 order-2 order-md-1 my-col">
                  <Button
                    onClick={() => prevBtn()}
                    variant="outline-info"
                    className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"
                  >
                    <MdKeyboardArrowLeft />
                  </Button>
                </div>
                <div className="col-5  order-2 order-md-2  my-col calendar-tools-date">
                  <h4 className="text-uppercase font-weight-bold mt-1">
                    {calendarTitle}
                  </h4>
                </div>
                <div className="col-2  order-3 order-md-3 my-col">
                  <Button
                    onClick={() => nextBtn()}
                    variant="outline-info"
                    className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"
                  >
                    <MdKeyboardArrowRight />
                  </Button>
                </div>
                <div className="col-3  order-1 order-md-3 my-col">
                  <Button
                    onClick={() => todayBtn()}
                    variant="outline-info"
                    className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4"
                  >
                    TODAY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading === true && <AiOutlineLoading3Quarters color="inherit" />}
        <div>
          <CalendarMonthView toogleLoading={toogleLoading} />
        </div>
      </Container>
    </>
  );
}
