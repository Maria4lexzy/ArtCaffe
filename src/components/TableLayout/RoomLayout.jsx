import React from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "@pronestor/react-zoom-pan-pinch";
import LayoutElement from "./LayoutElement";
import { useSelector } from "react-redux";
export default function RoomLayout(props) {
  //////////////////TODO: error selecting 3 tables
  const { selected } = useSelector((state) => state.reservations);
  const clickedElement = (element) => {
    if (
      !(
        element === selected[0] ||
        element === selected[1] ||
        element === selected[2]
      )
    )
      props.handleTableClick(element);
  };
  return (
    <TransformWrapper
      defaultScale={1}
      options={{ minScale: 0.2 }}
      zoomIn={{ step: 10 }}
      zoomOut={{ step: 10 }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              zIndex: 100,
            }}
          ></div>
          <TransformComponent>
            <div
              style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                backgroundImage: `url(${props.background})`,
                backgroundRepeat: "no-repeat",
                backgroundPositiuon: "center",
                pointerEvents: "auto !important",
              }}
            >
              {props.tables.map((target) => (
                <LayoutElement
                  key={target.id}
                  properties={target}
                  clickedElem={clickedElement}
                />
              ))}
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}
