import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import "./Calendar.scss";
import "./ReservationSheet.scss";
import CalendarMonthView from "./CalendarMonthView";
import { createReservation } from "../../firebase";
import Sheet from "react-modal-sheet";
import Select from "react-select";
import { tables } from "../../constants";

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

// For generating number 1-12 to populate the Guests Select list
const populateGuestsSelect = () => {
  let nr_guest = [];
  for (let i = 1; i <= 12; i++) {
    nr_guest.push(i);
  }
  return nr_guest;
};
export default function Calendar() {
  const { date, calendarTitle, monthData } = useSelector(
    (state) => state.calendar
  );

  const [isModalOpen, setOpenModal] = useState(false);
  const [dateSelected, setDateSelected] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guests: "1",
      table: "",
      name: "",
      email: "",
      phone: "",
      time: "",
    },
  });
  const tableOptions = tables.tableSelect;

  // const nr_guest_ref = useRef(0);
  // const tables_ref = useRef("");
  // const name_ref = useRef("");
  // const email_ref = useRef("");
  // const time_ref = useRef("");
  // const phone_ref = useRef("");

  useEffect(() => {
    let today = new Date();

    let firstDayInMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    getReservations(today)
      .then((result) => {
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

  const submitReservation = async (data) => {
    // e.preventDefault();
    let tablesWithoutSpaces = [];
    if (data.table > 2) {
      tablesWithoutSpaces = data.table.split(",");
    } else tablesWithoutSpaces.push(data.table);
    console.log(
      new Date(dateSelected),
      data.name,
      data.phone,
      data.email,
      data.guests,
      tablesWithoutSpaces[0],
      data.time
    );
  };
  const onSubmit = (data) => {
    console.log("dkdjfldkj");
    submitReservation(data);
  };
  const colourStyles = {
    menuList: (styles) => ({
      ...styles,
      // background: "violet",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#f15b25" : isSelected ? "#f15b25" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  return (
    <>
      {/* Calendar Tools */}
      <Toaster />

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
            <CalendarMonthView dateClicked={dateClicked} />
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
                  onSubmit={handleSubmit((data) => onSubmit(data))}
                >
                  <div>
                    <label className="p__opensans" htmlFor="guests">
                      Guests
                    </label>
                    <select
                      {...register("guests")}
                      required
                      // ref={nr_guest_ref}
                      name="guests"
                      id="guest"
                    >
                      {populateGuestsSelect().map((e, k) => {
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
                    {/* <Select
                      {...register("table")}
                      options={tableOptions}
                      type="text"
                      name="table"
                      // ref={tables_ref}
                      // placeholder="T4, T1"
                      required
                    /> */}
                    <Controller
                      control={control}
                      defaultValue={tableOptions.map((c) => c.value)}
                      name="table"
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          classNamePrefix="react-select"
                          className="react-select-container"
                          inputRef={ref}
                          value={tableOptions.filter((c) =>
                            value.includes(c.value)
                          )}
                          onChange={(val) => onChange(val.map((c) => c.value))}
                          options={tableOptions}
                          isMulti
                          // styles={{
                          //   control: (baseStyles, state) => ({
                          //     ...baseStyles,
                          //     borderColor: state.isFocused ? "grey" : "red",
                          //   }),
                          // }}
                          // theme={(theme) => ({
                          //   ...theme,

                          //   font: "Oregano",
                          //   borderRadius: "4px",

                          //   colors: {
                          //     ...theme.colors,
                          //     primary25: "#f15b25",
                          //     primary: "#f15b25",
                          //   },
                          // })}
                          styles={colourStyles}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="name">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      name="name"
                      // ref={name_ref}
                      placeholder="Jakub"
                      required
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="email">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      name="email"
                      // ref={email_ref}
                      // placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="number">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      name="phone"
                      // ref={phone_ref}
                      // placeholder="+427 55 89 46"
                    />
                  </div>
                  <div>
                    <label className="p__opensans" htmlFor="time">
                      Time
                    </label>
                    <input
                      {...register("time")}
                      // ref={time_ref}
                      type="time"
                      name="time"
                      id="appt"
                      min="18:00"
                      max="23:00"
                      // ref={time_ref}

                      required
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
