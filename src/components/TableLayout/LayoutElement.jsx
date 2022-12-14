import React, { useState, useEffect } from "react";
import "./TableLayout.scss";
import { useSelector } from "react-redux";
export default function LayoutElement(props) {
  const { properties } = props;
  const [isClicked, setIsClicked] = useState(false);
  const { selected, disabled, disabledSmall } = useSelector(
    (state) => state.reservations
  );
  useEffect(() => {}, [properties.id, properties.classSelector]);

  const generateStyleObject = (attributes) => ({
    width: `${attributes.width}px`,
    height: `${attributes.height}px`,
    top: `${attributes.top}px`,
    left: `${attributes.left}px`,
    fontSize: `${attributes.fontSize}px`,
    background: attributes.backgroundColor,
    color: attributes.fontColor,
  });

  const onClick = (unselect) => {
    if (!disabled[properties.id]) {
      if (unselect === false) {
        setIsClicked(false);
      } else {
        if (isClicked) {
          props.clickedElem(properties.id, false);
          setIsClicked(false);
        } else {
          props.clickedElem(properties.id, true);
          setIsClicked(true);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div
        id={properties.id}
        className={
          properties.classSelector +
          (selected[0] === properties.id ||
          selected[1] === properties.id ||
          selected[2] === properties.id
            ? " selected"
            : "") +
          (disabled[properties.id] ? " disabled" : "") +
          (disabledSmall[properties.id] ? " small_disabled" : "")
        }
        style={generateStyleObject(properties)}
        //onMouseEnter={()=>selectElement()}
        //onMouseLeave={onMouseLeave}
        onClick={() => onClick()}
      >
        <div className="table_img">
          <img
            className="layout-img"
            src={properties.pic}
            alt={properties.alt}
          />
          {disabled[properties.id] ? (
            <span className="reserved">
              Rezervovan√© od {disabled[properties.id]}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
