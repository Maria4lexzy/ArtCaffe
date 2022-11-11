import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { pics, tables } from "../../constants";
import RoomLayout from "./RoomLayout";
import { selectedAction } from "../../redux/ReservationLayoutSlice";
import { useState } from "react";

export default function Layout() {
  const [selectedRoom, setSelectedRoom] = useState("CR");

  const dispatch = useDispatch();
  const { selected, disabled, disabledSmall, tableCombinations } = useSelector(
    (state) => state.reservations
  );

  const handleRoomButtonClick = (table) => {
    if (
      !(table === selected[0] || table === selected[1] || table === selected[2])
    ) {
      //check if there is table combinations or signle table is enough for people
      if (tableCombinations.length > 0) {
        //WARNING: it will take first possible combination for the table
        let tableNotFound = true;
        console.log(tableCombinations);
        tableCombinations.every((tableComb) => {
          //check if its table from same room othervise skip loop
          if (tableComb[0].substring(0, 1) === table.substring(0, 1)) {
            //if table found every will break a loop iteration
            tableComb.every((t) => {
              if (table === t) {
                tableNotFound = false;
                dispatch(
                  selectedAction({
                    newSelected: tableComb,
                  })
                );
                return false;
              }
              return true;
            });
          }
          return tableNotFound;
        });
      } else {
        dispatch(
          selectedAction({
            newSelected: [table],
          })
        );
      }
    }
  };

  return (
    <>
      <div>
        <button type="button" onClick={() => setSelectedRoom("T")}>
          Terace
        </button>
        <button type="button" onClick={() => setSelectedRoom("SR")}>
          Smoking room
        </button>
        <button type="button" onClick={() => setSelectedRoom("CR")}>
          Coffee room
        </button>
      </div>

      {selectedRoom === "CR" ? (
        <>
          {tables.coffeeRoom.map((roomBtn) => (
            <button
              type="button"
              key={roomBtn.id + "-btn"}
              disabled={disabled[roomBtn.id] || disabledSmall[roomBtn.id]}
              onClick={() => handleRoomButtonClick(roomBtn.id)}
            >
              {roomBtn.id}
            </button>
          ))}

          <RoomLayout
            tables={tables.coffeeRoom}
            background={pics.KBackground}
            width="1550"
            height="355"
            handleTableClick={handleRoomButtonClick}
          />
        </>
      ) : selectedRoom === "SR" ? (
        <>
          {tables.smokingRoom.map((roomBtn) => (
            <button
              type="button"
              key={roomBtn.id + "-btn"}
              onClick={() => handleRoomButtonClick(roomBtn.id)}
            >
              {roomBtn.id}
            </button>
          ))}
          <RoomLayout
            tables={tables.smokingRoom}
            background={pics.SBackground}
            width="600"
            height="485"
            handleTableClick={handleRoomButtonClick}
          />
        </>
      ) : (
        <>
          {tables.terace.map((roomBtn) => (
            <button
              type="button"
              key={roomBtn.id + "-btn"}
              onClick={() => handleRoomButtonClick(roomBtn.id)}
            >
              {roomBtn.id}
            </button>
          ))}
          <RoomLayout
            tables={tables.terace}
            background={pics.TBackground}
            width="1200"
            handleTableClick={handleRoomButtonClick}
            height="375"
          />
        </>
      )}
    </>
  );
}
