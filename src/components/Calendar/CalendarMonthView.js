import React, { useState, useEffect } from "react";
import "./Calendar.css";
import {
  getFirstDayIndex,
  getWeekNumbers,
  getFirstDateFromWeekNo,
  getLastDayOfMonth,
} from "../../utils/calendar.js";
import { Table } from "react-bootstrap";
import CalendarCell from "./CalendarCell";
import store from "../../redux/configureStore";
import {
  currentTitleAction,
  fistDateInWeekAction,
  monthDataAction,
} from "../../redux/CalendarSlice";
import { useDispatch } from "react-redux";
import watch from "redux-watch";
import { getMonthOpeningHours } from "../../firebase";

export default function CalendarMonthView(props) {
  //titleText needs to be same name as a slice initial state

  const [weekNumbers, setWeekNumbers] = useState([]);
  const [firstCalRow, setFirstCalRow] = useState([]);
  const [secondCalRow, setSecondCalRow] = useState([]);
  const [thirdCalRow, setThirdCalRow] = useState([]);
  const [fourthCalRow, setFourthCalRow] = useState([]);
  const [fifthCalRow, setFifthCalRow] = useState([]);
  const [sixthCalRow, setSixthCalRow] = useState([]);
  //added because calculation of first date in week was wrong if calendar displayed previous month dates
  const dispatch = useDispatch();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // store is THE redux store
  useEffect(() => {
    let wData = watch(store.getState, "calendar.date");
    const unsubscribeWData = store.subscribe(
      wData((newVal, oldVal, objectPath) => {
        if (newVal !== oldVal) {
          getMonthOpeningHours(new Date())
            .then((result) => {
              renderCalendar(new Date(store.getState().calendar.date), result);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
    );
    return () => {
      unsubscribeWData();
    };

    //eslint-disable-next-line
  }, []);

  const changeSelectedDropdown = (type) => {
    props.changeState(type);
  };
  const renderCalendar = (updatedDate, monthData) => {
    dispatch(
      currentTitleAction({
        newTitle:
          monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear(),
      })
    );

    //first day name index
    updatedDate.setDate(1);
    let firstDayIndex = getFirstDayIndex(updatedDate);
    //get number of days in the current month

    let lastDay = new Date(
      updatedDate.getFullYear(),
      updatedDate.getMonth() + 1,
      0
    ).getDate();
    //get number of days in previous month
    let prevLastDay = new Date(
      updatedDate.getFullYear(),
      updatedDate.getMonth(),
      0
    ).getDate();
    //total days of current month - laterr adding days from previous and next month
    //setWeekNumbersFromDate
    let weekNumbersFromDate;
    if (firstDayIndex > 0) {
      weekNumbersFromDate = new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth() - 1,
        prevLastDay - firstDayIndex + 1
      );
    } else {
      weekNumbersFromDate = new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth(),
        1
      );
    }
    let weekNumber = updatedDate.getWeekNumber();
    ///////update first date of a first week in a month calendar
    let newFirstDateInWeek = "";
    if (
      weekNumber === 53 ||
      (weekNumber === 52 && updatedDate.getMonth() === 0)
    )
      newFirstDateInWeek = getFirstDateFromWeekNo(
        weekNumber,
        updatedDate.getFullYear() - 1
      ).toString();
    else
      newFirstDateInWeek = getFirstDateFromWeekNo(
        weekNumber,
        updatedDate.getFullYear()
      ).toString();

    dispatch(fistDateInWeekAction({ newWeekDate: newFirstDateInWeek }));

    //set week numbers array
    setWeekNumbers(getWeekNumbers(weekNumbersFromDate));
    //creates previous month calendar days
    let forwardToNextMonth = createCurrentMonth(
      createPreviousMonthArray(updatedDate, prevLastDay, firstDayIndex),
      updatedDate,
      lastDay,
      monthData
    );
    createNextMonth(updatedDate, forwardToNextMonth);
  };
  //loop for creating previous month date numbers and update week date state
  const createPreviousMonthArray = (
    updatedDate,
    prevLastDay,
    firstDayIndex
  ) => {
    let plusTotalDays = 0;
    let daysArray = [];
    const year = updatedDate.getFullYear();
    const month = updatedDate.getMonth() + 1;
    //cell.classname} key={cell.key} id={cell.id} daynumber={cell.daynumber} data={cell.data

    for (let x = firstDayIndex; x > 0; x--) {
      const newCell = {
        keyProp: year + `-` + month + `-` + (prevLastDay - x + 1),
        id:
          year +
          `-` +
          ("0" + (month - 1)).slice(-2) +
          `-` +
          ("0" + (prevLastDay - x + 1)).slice(-2),
        classname: "faded-text",
        daynumber: prevLastDay - x + 1,
        data: [],
      };

      daysArray.push(newCell);
      plusTotalDays++;
    }
    //update first week date
    return [plusTotalDays, daysArray];
  };
  //loop for creating current month date numbers
  const createCurrentMonth = (
    prevMonthArray,
    updatedDate,
    lastDay,
    monthData
  ) => {
    let numberOfPrintedDays = prevMonthArray[0];
    let daysArray = prevMonthArray[1];
    const year = updatedDate.getFullYear();
    const month = updatedDate.getMonth() + 1;
    let printedRows = 0;
    let printedDays = 0;
    for (let i = 1; i <= lastDay; i++) {
      if (numberOfPrintedDays % 7 === 0 && numberOfPrintedDays !== 0) {
        switch (printedRows) {
          case 0: {
            setFirstCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 1: {
            setSecondCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 2: {
            setThirdCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 3: {
            setFourthCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 4: {
            setFifthCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 5: {
            setSixthCalRow(daysArray);
            daysArray = [];
            break;
          }
          default:
            break;
        }
        printedRows++;
      }

      let newCell;
      let dayData = monthData[year + `-` + +month + `-` + ("0" + i).slice(-2)];
      if (
        i === new Date().getDate() &&
        updatedDate.getMonth() === new Date().getMonth() &&
        updatedDate.getFullYear() === new Date().getFullYear()
      ) {
        newCell = {
          keyProp: year + `-` + +month + `-` + i,
          id: year + `-` + ("0" + month).slice(-2) + `-` + ("0" + i).slice(-2),
          classname: "today",
          daynumber: i,
          data: dayData,
        };
      } else {
        newCell = {
          keyProp: year + `-` + +month + `-` + i,
          id: year + `-` + ("0" + month).slice(-2) + `-` + ("0" + i).slice(-2),
          classname: "",
          daynumber: i,
          data: dayData,
        };
      }
      printedDays++;
      daysArray.push(newCell);
      numberOfPrintedDays++;
    }

    return [numberOfPrintedDays, printedRows, daysArray];
  };
  //loop for creating next month date numbers
  const createNextMonth = (updatedDate, printedData) => {
    let numberOfPrintedDays = printedData[0];
    let rowNumber = printedData[1];
    let daysArray = printedData[2];
    const year = updatedDate.getFullYear();
    const month = updatedDate.getMonth() + 1;
    let loopHandler = 42 - numberOfPrintedDays;
    for (let j = 1; j <= loopHandler; j++) {
      if (numberOfPrintedDays % 7 === 0) {
        switch (rowNumber) {
          case 3: {
            setFourthCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 4: {
            setFifthCalRow(daysArray);
            daysArray = [];
            break;
          }
          case 5: {
            break;
          }
          case 2: {
            setThirdCalRow(daysArray);
            daysArray = [];
            break;
          }
          default:
            break;
        }
        rowNumber++;
      }
      numberOfPrintedDays++;
      const newCell = {
        keyProp: year + `-` + month + 1 + `-` + j,
        id:
          year +
          `-` +
          ("0" + (month + 1)).slice(-2) +
          `-` +
          ("0" + j).slice(-2),
        classname: "faded-text",
        daynumber: j,
        data: [],
      };
      daysArray.push(newCell);
    }
    setSixthCalRow(daysArray);
  };
  return (
    <>
      <div className="mt-5 calendar">
        <Table bordered responsive="md" className="month">
          <thead className="text-uppercase text-center">
            <tr>
              <th>Week no.</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            <tr key="row1tr">
              <td key="row1">
                <div
                  key="weekRow1"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[0]}
                </div>
              </td>
              {firstCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
            <tr key="row2tr">
              <td key="row2">
                <div
                  key="weekRow2"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[1]}
                </div>
              </td>
              {secondCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
            <tr key="row3tr">
              <td key="row3">
                <div
                  key="weekRow3"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[2]}
                </div>
              </td>
              {thirdCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
            <tr key="row4tr">
              <td key="row4">
                <div
                  key="weekRow4"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[3]}
                </div>
              </td>
              {fourthCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
            <tr key="row5tr">
              <td key="row5">
                <div
                  key="weekRow5"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[4]}
                </div>
              </td>
              {fifthCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
            <tr key="row6tr">
              <td key="row6">
                <div
                  key="weekRow6"
                  className="day-field"
                  style={{ fontWeight: "bold" }}
                >
                  {weekNumbers[5]}
                </div>
              </td>
              {sixthCalRow.map((cell) => {
                return (
                  <CalendarCell
                    classname={cell.classname}
                    keyProp={cell.keyProp}
                    id={cell.id}
                    daynumber={cell.daynumber}
                    data={cell.data}
                    key={cell.keyProp + "-CC"}
                    changeSelectedDropdown={changeSelectedDropdown}
                  />
                );
              })}
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
