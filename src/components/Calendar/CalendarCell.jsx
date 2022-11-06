import React, { useRef, useState } from "react";

//mouse events
const initialState = {
  mouseX: null,
  mouseY: null,
};
export default function WorkerCalendarCell(props) {
  const [state, setState] = useState(initialState);
  const [selectedDay, setSelectedDay] = useState("");
  const rightClickRef = useRef();
  const handleRightClick = (event, key) => {
    event.preventDefault();
    setSelectedDay(key);
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleDetailsDialog = (event, key) => {
    console.log("ss");
  };

  return (
    <>
      <td
        ref={rightClickRef}
        onClick={(e) => handleDetailsDialog(e, props)}
        onContextMenu={(e) => handleRightClick(e, props.id)}
        className={props.classname}
        key={props.keyProp}
        id={props.id}
      >
        <div className="day-field">{props.daynumber}</div>
        <div className="events-wrapper mt-5">
          {props.data && (
            <div
              style={{ cursor: "context-menu" }}
              className={props.data.worker_state + "  px-1 monthEventStyles"}
              key={props.data.worker_state + props.keyProp}
              id={props.data.worker_state + "_" + props.keyProp}
            >
              <p className="" style={{ color: "black" }}>
                {props.data.start}-{props.data.end}
              </p>
            </div>
          )}
        </div>
      </td>
    </>
  );
}
