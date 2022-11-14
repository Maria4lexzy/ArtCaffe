import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { setMinutes, setHours } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  disableSmallTables,
  getTableCombinations,
} from "./disableUnsuitableTables";
import {
  getReservationsPublic,
  createReservation,
  getThreeMonthsOpeningHours,
} from "../../firebase";
import {
  tableCombinationsAction,
  disabledAction,
  disableSmallTablesAction,
} from "../../redux/ReservationLayoutSlice";
import { tables } from "../../constants";
import Layout from "../TableLayout/Layout";
import { getMonthName, getFirstDayIndex } from "../../utils/calendar";
import { getDateYYYYMMDD, getDateHHMMSS } from "../../utils/dateParser";
const ReserveTable = () => {
  const { selected, disabled } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const fName = useRef();
  const lName = useRef();
  const email = useRef();
  const phone = useRef();
  const [selectedTime, setSelectedTime] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [date, setDate] = useState(null);
  const [reservationStep, setReservationStep] = useState(0);
  const [openningHours, setOpenningHours] = useState({});
  const [closedDays, setClosedDays] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const reserveTable = () => {
    createReservation(
      date,
      userInfo[0] + " " + userInfo[1],
      userInfo[2],
      userInfo[3],
      numberOfPeople,
      selected,
      getDateHHMMSS(selectedTime)
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

    setNumberOfPeople(numberOfPeople);
  };
  const handleNextBtn = () => {
    ///////////////problem switch case is not calling case 3

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
            tables.tableSizes.forEach((table) => {
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
        if (date) {
          getReservationsPublic(date)
            .then((results) => {
              let disabled = {};

              if (results) {
                if (results[getDateYYYYMMDD(date)]) {
                  //disable sofa if there is less people than 9 and it's Friday or Saturday
                  disabled = results[getDateYYYYMMDD(date)];
                  if (
                    getFirstDayIndex(date) === 4 ||
                    (getFirstDayIndex(date) === 5 &&
                      numberOfPeople < 9 &&
                      !disabled["Sofa"])
                  ) {
                    disabled["Sofa"] = "Reservation for more than 9 people";
                  }
                  dispatch(disabledAction({ newDisabled: disabled }));
                } else {
                  if (
                    getFirstDayIndex(date) === 4 ||
                    (getFirstDayIndex(date) === 5 && numberOfPeople < 9)
                  ) {
                    disabled["Sofa"] = "For more than 8 people";
                  }
                  dispatch(disabledAction({ newDisabled: disabled }));
                }
              }
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
        if (selected.length > 0) setReservationStep(3);
        else {
          //display WARNING table not selected
        }
        break;
      }
      case 3: {
        if (
          fName.current.value &&
          lName.current.value &&
          phone.current.value &&
          email.current.value
        ) {
          setUserInfo([
            fName.current.value,
            lName.current.value,
            phone.current.value,
            email.current.value,
          ]);
          setReservationStep(4);
        } else {
          console.log("empty");
          //display WARNING table not selected
        }
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
      case 4: {
        setReservationStep(3);
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
              minTime={getMinMaxForTimePicker(true)}
              maxTime={getMinMaxForTimePicker(false)}
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
            />
          </>
        );
      }
      case 4: {
        return (
          <>
            <p>
              Reservation on {getDateYYYYMMDD(date)} at{" "}
              {getDateHHMMSS(selectedTime)}
            </p>
            <p> Name: {userInfo[0] + " " + userInfo[1]}</p>
            <p> For {numberOfPeople} people</p>
            <div>
              {" "}
              Table:
              {selected.map((t) => {
                return <p key={t}>{t},</p>;
              })}{" "}
            </div>
            <p>Phone(will be used to confim reservation): {userInfo[2]}</p>
            <p>Email(you will receive e-mail confirmation): {userInfo[3]}</p>
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
    let timeString;
    if (minMax) {
      timeString =
        openningHours[getMonthName(date)][getDateYYYYMMDD(date)]["start"];
    } else {
      timeString =
        openningHours[getMonthName(date)][getDateYYYYMMDD(date)]["end"];
    }

    return setHours(
      setMinutes(new Date(), timeString.substring(3, 5)),
      timeString.substring(0, 2) - 1
    );
  };
  const getExcludeDays = (results) => {
    let days = [];
    let date = new Date();
    for (let i = 0; i < 4; i++) {
      results["Closed"][getMonthName(date)].forEach((day) => {
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
        disabled={reservationStep === 4}
      >
        Next
      </button>
    </>
  );
};

export default ReserveTable;
