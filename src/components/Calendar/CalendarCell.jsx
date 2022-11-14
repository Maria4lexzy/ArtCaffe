import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./CalendarCell.scss";

//mouse events

export default function WorkerCalendarCell(props) {
  const rightClickRef = useRef();
  const { monthData } = useSelector((state) => state.calendar);
  const handleDetailsDialog = (event, key) => {
    props.dateClicked(props.id);
  };

  return (
    <>
      <td
        ref={rightClickRef}
        onClick={(e) => handleDetailsDialog(e, props)}
        className="app__calendar_cell"
        key={props.keyProp}
        id={props.id}
      >
        <div className={"app__calendar_cell" + props.classname}>
          {monthData[props.id] ? (
            <>
              {props.daynumber}
              <div className="event-marker"></div>
            </>
          ) : (
            <>{props.daynumber}</>
          )}

          {props.data && (
            <div
              className={props.data.worker_state + "events"}
              key={props.data.worker_state + props.keyProp}
              id={props.data.worker_state + "_" + props.keyProp}
            >
              {" "}
              <p className="data">
                {props.data.start}
                {props.data.end}
              </p>
            </div>
          )}
        </div>{" "}
      </td>
    </>
  );
}
