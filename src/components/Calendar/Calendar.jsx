import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import "./Calendar.scss";
import "./ReservationSheet.scss";
import CalendarMonthView from "./CalendarMonthView";
import { createReservation } from "../../firebase";
import Sheet from "react-modal-sheet";
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
import SubHeading from "../SubHeading/SubHeading";

const populateSelect = () => {
  let list = [];

  for (let i = 1; i <= 12; i++) {
    list.push(i);
  }
  console.log(list);
  return list;
};
export default function Calendar() {
  const { date, calendarTitle, monthData } = useSelector(
    (state) => state.calendar
  );

  const [open, setOpen] = useState(false);
  const [isModalOpen, setOpenModal] = useState(false);
  const [dateSelected, setDateSelected] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guests: "1",
      table: "T1, T4",
      name: "Alex",
      emai: "alex@gmail.com",
    },
  });
  const nr_guest_ref = useRef(0);
  const tables_ref = useRef("");
  const name_ref = useRef("");
  const email_ref = useRef("");
  const phone_ref = useRef("");
  const time_ref = useRef("");

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
  const deleteReservation = () => {
    console.log("delete function called");
  };

  async function submitReservation(data) {
    // e.preventDefault();
    let tables = [];
    if (data.table.length > 2) {
      tables = tables_ref.current.value.split(",");
    } else tables = tables_ref.current.value;
    try {
      createReservation(
        new Date(date),
        // name_ref.current.value,
        // phone_ref.current.value,
        // email_ref.current.value,
        // nr_guest_ref.current.value,
        data.name,
        data.phone,
        data.email,
        data.guests,
        tables,
        data.time
      )
        .then((result) => {
          console.log(result);
          if (result === "success") {
            toast.success("Reservation created");
          } else if (result === "error") {
            toast.error("problemoo");
          }
        })
        .catch(function (error) {
          // setError(language.wrong_password);
          //setLoading(false);
          console.log(error);
        });
    } catch (e) {
      //setError(language.wrong_password);
      //setLoading(false);
      console.log(e);
    }
  }

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
              <button
                type="button"
                className="custom__button--dark"
                onClick={() => setOpenModal(true)}
              >
                New Reservation <BsPlus className="icon" />
              </button>
            </div>
          </div>
          <div className="app__calendar--event-details">
            {monthData[dateSelected] ? (
              <div className="event-wrapper">
                {
                  // monthData && dateSelected && (Object.values(monthData).indexOf(dateSelected) > -1)

                  Object.entries(monthData[dateSelected]).map((data, index) => {
                    return (
                      <div className="event" key={index}>
                        <datetime
                          dateTime="20:00"
                          className="p__cormorant time"
                        >
                          {data[1].time}
                        </datetime>
                        <div className=" data ">
                          <p className="p__opensans name">{data[1].name} </p>
                          <p className="p__opensans">
                            {data[0] + " - " + data[1].people + " people"}
                          </p>
                          <hr className="custom__hr" />
                          <p className="p__opensans phone">{data[1].phone}</p>
                          <p className="p__opensans email">{data[1].email}</p>
                        </div>
                        <BsFillTrashFill
                          className="icon"
                          onClick={() => deleteReservation()}
                        />
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
      <div className="app__reservationsheet">
        <Sheet
          isOpen={isModalOpen}
          onClose={() => setOpenModal(false)}
          // detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <Toaster />
              <div className="app__reservationsheet">
                <div className="app__modalsheet-heading">
                  <SubHeading title="Create Reservation Reservation" />
                </div>
                <form
                  className="app__reservationsheet-input "
                  onSubmit={handleSubmit((data) => submitReservation(data))}
                >
                  <div>
                    <label className="p__opensans" htmlFor="guests">
                      Guests
                    </label>
                    <select
                      required
                      ref={nr_guest_ref}
                      {...register("guests")}
                      name="guests"
                      id="guest"
                    >
                      {populateSelect().map((e, k) => {
                        return (
                          <option key={k} value={e}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="table">
                      Table(s)
                    </label>
                    <input
                      {...register("table", { required: true })}
                      type="text"
                      name="table"
                      ref={tables_ref}
                      placeholder="T4, T1"
                      required
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="name">
                      Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      ref={name_ref}
                      placeholder="Jakub"
                      required
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      ref={email_ref}
                      {...register("email")}
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="number">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      {...register("phone")}
                      placeholder="+427 55 89 46"
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="time">
                      Time
                    </label>
                    <input
                      ref={time_ref}
                      type="time"
                      name="time"
                      id="appt"
                      min="18:00"
                      max="23:00"
                      // ref={time_ref}
                      {...register("time", { required: true })}
                    />
                  </div>
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                  <button type="submit" className="custom__button">
                    Reserve
                  </button>
                </form>
              </div>
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop />
        </Sheet>
      </div>
    </>
  );
}
