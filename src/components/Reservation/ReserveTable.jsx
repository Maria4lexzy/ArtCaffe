import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  disableSmallTables,
  getTableCombinations,
} from "./disableUnsuitableTables";
import {
  getReservationsPublic,
  createReservation,
  getThreeMonthsOpeningHours,
  generateMonthOpeningHours,
} from "../../firebase";
import {
  tableCombinationsAction,
  disabledAction,
  disableSmallTablesAction,
} from "../../redux/ReservationLayoutSlice";
import { tables } from "../../constants";
import Layout from "../TableLayout/Layout";
import { getMonthName } from "../../utils/calendar";
import { getDateYYYYMMDD } from "../../utils/dateParser";
const ReserveTable = () => {
  const { selected, disabled } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const fName = useRef();
  const lName = useRef();
  const email = useRef();
  const phone = useRef();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [date, setDate] = useState(new Date());
  const [reservationStep, setReservationStep] = useState(0);
  const [openningHours, setOpenningHours] = useState({});
  const [closedDays, setClosedDays] = useState([]);
  const handleSelectTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  const reserveTable = () => {
    createReservation(
      new Date(date.current.value),
      fName.current.value + " " + lName.current.value,
      phone.current.value,
      email.current.value,
      numberOfPeople,
      selected,
      selectedTime
    )
      .then((message) => {
        console.log(message);
      })
      .catch((e) => {
        console.log(e);
      });
    /*createReservation(
      new Date("2022-11-09"),
      "TEST",
      "TEST",
      "TEST",
      5,
      ["F5", "F6"],
      "16:15"
    )
      .then((message) => {
        console.log(message);
      })
      .catch((e) => {
        console.log(e);
      });*/
  };
  const handleSelectChange = (e) => {
    const numberOfPeople = e.target.value;
    console.log(numberOfPeople);
    setNumberOfPeople(numberOfPeople);
  };
  const handleNextBtn = () => {
    ///////////////problem switch case is not calling case 3
    console.log(reservationStep);
    switch (reservationStep) {
      case 0: {
        if (numberOfPeople > 0) {
          if (numberOfPeople <= 5) {
            dispatch(
              disableSmallTablesAction({
                newdisableSmallTables: disableSmallTables(
                  numberOfPeople,
                  disabled
                ),
              })
            );
            dispatch(tableCombinationsAction({ newTableCombinations: [] }));
          } else {
            let combinations = getTableCombinations(numberOfPeople, disabled);
            let allowedTables = {};
            combinations.forEach((combination) => {
              combination.forEach((table) => {
                allowedTables[table] = 0;
              });
            });
            let disabledTables = {};
            tables.tableSizes.map((table) => {
              if (allowedTables[table.name] === undefined)
                disabledTables[table.name] = table.people;
            });
            dispatch(
              disableSmallTablesAction({
                newdisableSmallTables: disabledTables,
              })
            );
            dispatch(
              tableCombinationsAction({ newTableCombinations: combinations })
            );
          }
          getThreeMonthsOpeningHours(new Date())
            .then((results) => {
              setOpenningHours(results);
              console.log(results);
              getExcludeDays(results);
              setReservationStep(1);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          //display WARNING people not selected
        }
        break;
      }
      case 1: {
        if (date !== "") {
          getReservationsPublic(new Date(date))
            .then((results) => {
              if (results)
                if (results[date])
                  dispatch(disabledAction({ newDisabled: results[date] }));

              setReservationStep(2);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          //display WARNING date not selected
        }
        break;
      }
      case 2: {
        setReservationStep(3);
        break;
      }

      default:
        break;
    }
  };
  const handleBackBtn = () => {
    switch (reservationStep) {
      case 1: {
        setReservationStep(0);
        break;
      }
      case 2: {
        dispatch(disabledAction({ newDisabled: [] }));
        setReservationStep(1);
        break;
      }
      case 3: {
        setReservationStep(2);
        break;
      }
      default:
        break;
    }
  };
  const renderReservationStep = (param) => {
    switch (param) {
      case 0: {
        return (
          <>
            <label htmlFor="people">Choose number of people:</label>
            <select
              name="people"
              id="people"
              value={numberOfPeople}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </>
        );
      }
      case 1: {
        return (
          <>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              excludeDates={closedDays}
              minDate={getMinMaxForDatePicker(true)}
              maxDate={getMinMaxForDatePicker(false)}
              placeholderText="Select date"
            />
          </>
        );
      }
      case 2: {
        return (
          <>
            <Layout />
          </>
        );
      }
      case 3: {
        return (
          <>
            <label htmlFor="fname">First name:</label>
            <input required type="text" id="fname" name="fname" ref={fName} />
            <label htmlFor="lname">Last name:</label>
            <input required type="text" id="lname" name="lname" ref={lName} />
            <label htmlFor="email">E-mail:</label>
            <input required type="email" id="email" name="email" ref={email} />
            <label htmlFor="phone">Telefone:</label>
            <input required type="tel" id="phone" name="phone" ref={phone} />
            <DatePicker
              selected={selectedTime}
              onChange={(date) => setSelectedTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              timeFormat="HH:mm"
            />

            <button type="button" onClick={() => reserveTable()}>
              Confirm reservations
            </button>
          </>
        );
      }

      default:
        return "";
    }
  };
  //if true use min if false send max
  const getMinMaxForDatePicker = (minMax) => {
    var today = new Date();
    if (minMax) {
      //check if there is 4 hour before closing time
      let todayPlus4H = new Date();
      todayPlus4H.setHours(today.getHours() + 4);
      //if different day send tomorrow as a min in a date picker
      if (todayPlus4H.getDate() !== today.getDate())
        return new Date(todayPlus4H);
      else return new Date(today);
    } else {
      let threeMonthsFront = today.setMonth(today.getMonth() + 3);
      return new Date(threeMonthsFront);
    }
  };
  const getMinMaxForTimePicker = (minMax) => {
    if (minMax) {
      console.log(
        openningHours[getMonthName(date)][getDateYYYYMMDD(date)]["start"]
      );
      return (
        openningHours[getMonthName(date)][getDateYYYYMMDD(date)]["start"] +
        ":00"
      );
    } else {
      return (
        openningHours[getMonthName(date)][getDateYYYYMMDD(date)]["end"] + ":00"
      );
    }
  };
  const getExcludeDays = (results) => {
    let days = [];
    let date = new Date();
    for (let i = 0; i < 4; i++) {
      results["Closed"][getMonthName(date)].map((day) => {
        days.push(new Date(day));
      });
      date.setMonth(date.getMonth() + 1);
    }
    setClosedDays(days);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => handleBackBtn()}
        disabled={reservationStep === 0}
      >
        Back
      </button>

      {renderReservationStep(reservationStep)}
      <button
        type="button"
        onClick={() => handleNextBtn()}
        disabled={reservationStep === 3}
      >
        Next
      </button>
    </>
  );
};

export default ReserveTable;
