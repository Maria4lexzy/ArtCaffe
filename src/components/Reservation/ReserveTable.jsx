import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  disableSmallTables,
  getTableCombinations,
} from "./disableUnsuitableTables";
import { getReservationsPublic, createReservation } from "../../firebase";
import {
  tableCombinationsAction,
  disabledAction,
  disableSmallTablesAction,
} from "../../redux/ReservationLayoutSlice";
import { tables } from "../../constants";
import Layout from "../TableLayout/Layout";
const ReserveTable = () => {
  const { selected, disabled } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const fName = useRef();
  const lName = useRef();
  const email = useRef();
  const phone = useRef();
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [date, setDate] = useState("");
  const [reservationStep, setReservationStep] = useState(0);

  const handleSelectTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  const reserveTable = () => {
    createReservation(
      new Date(date),
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
  };
  const handleSelectChange = (e) => {
    const numberOfPeople = e.target.value;
    console.log(numberOfPeople);
    setNumberOfPeople(numberOfPeople);
    if (numberOfPeople <= 5) {
      dispatch(
        disableSmallTablesAction({
          newdisableSmallTables: disableSmallTables(e.target.value, disabled),
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
        disableSmallTablesAction({ newdisableSmallTables: disabledTables })
      );
      dispatch(tableCombinationsAction({ newTableCombinations: combinations }));
    }
    setReservationStep(1);
  };
  const handleNextBtn = () => {
    ///////////////problem switch case is not calling case 3
    console.log(reservationStep);
    switch (reservationStep) {
      case 0: {
        if (numberOfPeople > 0) setReservationStep(1);
        else {
          //display WARNING people not selected
        }
        break;
      }
      case 1: {
        if (date !== "") setReservationStep(2);
        else {
          //display WARNING date not selected
        }
        break;
      }
      case 2: {
        console.log("casedas");
        getReservationsPublic(new Date(date))
          .then((results) => {
            console.log(results);
            if (results[date]) {
              dispatch(disabledAction({ newDisabled: results[date] }));
            }

            setReservationStep(3);
          })
          .catch((e) => {
            console.log(e);
          });
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
  const handleSelectDate = (e) => {
    setDate(e.target.value);
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
            <label htmlFor="date">Select date</label>
            <input
              required
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => handleSelectDate(e)}
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
            <label htmlFor="phone">What time will you arrive?:</label>
            <input
              type="time"
              id="time"
              name="time"
              min="09:00"
              max="18:00"
              onChange={(e) => handleSelectTimeChange(e)}
              value={selectedTime}
              required
            ></input>
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
      <button type="button" onClick={() => reserveTable()}>
        Confirm reservations
      </button>
    </>
  );
};

export default ReserveTable;
