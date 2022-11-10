import React, { useState, useEffect } from "react";
import "./Calendar.scss";
import CalendarMonthView from "./CalendarMonthView";
import {
  currentDateAction,
  fistDateInWeekAction,
  dayDisplayedAction,
  monthDataAction,
} from "../../redux/CalendarSlice";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsFillTrashFill,
  BsPlus,
} from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { getFirstDateFromWeekNo } from "../../utils/calendar";
import { getReservations } from "../../firebase";
import { getDateYYYYMMDD, getDayName } from "../../utils/dateParser";

export default function Calendar() {
  const { loading, date, calendarTitle, monthData } = useSelector(
    (state) => state.calendar
  );

  const [open, setOpen] = useState(false);

  const [dateSelected, setDateSelected] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let today = new Date();

    let firstDayInMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    getReservations(today)
      .then((result) => {
        console.log(result);
        dispatch(monthDataAction({ month: result }));
        setDateSelected(getDateYYYYMMDD(today));
      })
      .catch((e) => {
        console.log(e);
      });
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
  const dateClicked = (date) => {
    setDateSelected(date);
  };

  return (
    <>
      {/* Calendar Tools */}
      <div className="app__calendar">
        <div className="app__calendar--cal">
          <div className="app__calendar--cal_tools">
            <div className="controls">
              <BsArrowLeftShort onClick={() => prevBtn()} className="icon " />
              {/* <p className='p__opensens' style={{ color: '#AAA' }}></p> */}
              <p className="p__opensans title"> {calendarTitle}</p>
              <BsArrowRightShort className="icon" onClick={() => nextBtn()} />
            </div>
            <div className="today">
              <button
                onClick={() => todayBtn()}
                type="button"
                className="custom__button"
              >
                TODAY
              </button>
            </div>
          </div>

          <div className="app__calendar--cal_month">
            <CalendarMonthView
              toogleLoading={toogleLoading}
              dateClicked={dateClicked}
            />
          </div>
        </div>

        {/* {loading === true && <AiOutlineLoading3Quarters color="inherit" />} */}
        <div className="app__calendar--event">
          <div className="app__calendar--event-date">
            <div className="day">
              <h1 className="headtext__cormorant">
                {dateSelected.substring(8, 10)}
              </h1>
              <p className="p__opensans">
                {getDayName(new Date(dateSelected), "en-US")}
              </p>
            </div>
            <div className="create-new">
              <button type="button" class="custom__button--dark">
                Add event <BsPlus />
              </button>
            </div>
          </div>
          <div className="app__calendar--event-details">
            {monthData[dateSelected] ? (
              <div className="event-wrapper">
                {
                  // monthData && dateSelected && (Object.values(monthData).indexOf(dateSelected) > -1)

                  Object.entries(monthData[dateSelected]).map((data) => {
                    return (
                      <div className="event">
                        <p className="p__cormorant time">{data[1].time}</p>
                        <div className=" data ">
                          <p className="p__opensans name">{data[1].name} </p>
                          <p className="p__opensans">
                            {data[0] + " - " + data[1].people + " people"}
                          </p>
                          <hr className="custom__hr" />
                          <p className="p__opensans phone">{data[1].phone}</p>
                          <p className="p__opensans email">{data[1].email}</p>
                        </div>
                        <BsFillTrashFill className="icon" />
                      </div>
                    );
                  })
                }
              </div>
            ) : (
              <h1 className="headtext__cormorant">No Events To Show Today</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
