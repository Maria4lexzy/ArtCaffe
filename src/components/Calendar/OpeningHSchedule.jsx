import React, { useState } from "react";
import "./OpeningHSchedule.scss";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Table } from "react-bootstrap";
// import TimePicker from "react-bootstrap-time-picker";
import { getOpeningHours, updateOpeningHours } from "../../firebase";
import { Button } from "react-bootstrap";
export default function OpeningHSchedule() {
  const [openningHours, setOpeningHours] = useState([]);
  //const [startH, setStartH] = useState({});
  //const [endH, setEndH] = useState({});
  const [day, setDay] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const getOpeningH = () => {
    getOpeningHours()
      .then((data) => {
        setOpeningHours(data.schedule);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeOpeningH = () => {
    let oh = openningHours;
    //const start = new Date(startH * 1000).toISOString().slice(11, 16);
    //const end = new Date(endH * 1000).toISOString().slice(11, 16);
    const start = new Date(1000).toISOString().slice(11, 16);
    const end = new Date(1000).toISOString().slice(11, 16);
    switch (day) {
      case "Monday": {
        oh[0] = start;
        oh[1] = end;
        break;
      }
      case "Tuesday": {
        oh[2] = start;
        oh[3] = end;
        break;
      }
      case "Wednesday": {
        oh[4] = start;
        oh[5] = end;
        break;
      }
      case "Thursday": {
        oh[6] = start;
        oh[7] = end;
        break;
      }
      case "Friday": {
        oh[8] = start;
        oh[9] = end;
        break;
      }
      case "Saturday": {
        oh[10] = start;
        oh[11] = end;
        break;
      }
      case "Sunday": {
        oh[12] = start;
        oh[13] = end;
        break;
      }
      default:
        break;
    }
    setIsChanged(true);
  };
  const handleSelectDay = (e) => {
    setDay(e.target.value);
  };

  const updateOpeningH = () => {
    updateOpeningHours(openningHours)
      .then((response) => {
        setIsChanged(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return openningHours[0] ? (
    <>
      <Container>
        <div className="calendar-tools">
          <div className="row text-center ">
            <h4 className="text-uppercase font-weight-bold mt-1">
              Opening hours
            </h4>
            <Table bordered responsive="md" className="month">
              <thead className="text-uppercase text-center">
                <tr>
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
                {openningHours && (
                  <tr key="row1tr">
                    <td key="mon">
                      <div className="day-field">
                        {openningHours[0]}-{openningHours[1]}
                      </div>
                    </td>
                    <td key="tue">
                      <div className="day-field">
                        {openningHours[2]}-{openningHours[3]}
                      </div>
                    </td>
                    <td key="wed">
                      <div className="day-field">
                        {openningHours[4]}-{openningHours[5]}
                      </div>
                    </td>
                    <td key="thu">
                      <div className="day-field">
                        {openningHours[6]}-{openningHours[7]}
                      </div>
                    </td>
                    <td key="fri">
                      <div className="day-field">
                        {openningHours[8]}-{openningHours[9]}
                      </div>
                    </td>
                    <td key="sat">
                      <div className="day-field">
                        {openningHours[10]}-{openningHours[11]}
                      </div>
                    </td>
                    <td key="sun">
                      <div className="day-field">
                        {openningHours[12]}-{openningHours[13]}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="row text-center mb-4">
            <div className="col-md-3 col-sm-12  mb-2">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleSelectDay(e)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Select>
            </div>
            {/* <div className="col-md-3 col-sm-12  mb-2">
              <TimePicker
                step={15}
                format={24}
                initialValue={"10:00:00"}
                onChange={(e) => handleStartTimeChange(e)}
                value={startH}
              />
            </div>
            <div className="col-md-3 col-sm-12  mb-2">
              <TimePicker
                step={15}
                format={24}
                initialValue={"10:00:00"}
                onChange={(e) => handleEndTimeChange(e)}
                value={endH}
              />
            </div> */}
            <div className="col-md-3 col-sm-12 mb-2">
              <Button
                onClick={() => changeOpeningH()}
                variant="outline-info"
                className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4"
              >
                Update opening hours
              </Button>
            </div>
          </div>
          {isChanged && (
            <div className="row text-center mb-5">
              <div className="col-12">
                <Button
                  onClick={() => updateOpeningH()}
                  variant="outline-info"
                  className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  ) : (
    <Container className="text-center mb-5">
      <Button
        onClick={() => getOpeningH()}
        variant="outline-info"
        className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4"
      >
        Change schedule
      </Button>
    </Container>
  );
}
