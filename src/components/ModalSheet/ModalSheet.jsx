import React from "react";
import { pics } from "../../constants";
import "./ModalSheet.scss";
import Sheet from "react-modal-sheet";
import { useState } from "react";
import SubHeading from "../SubHeading/SubHeading";
import { useTranslation } from "react-i18next";

const ModalSheet = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div>
        <h1>hello</h1>
        <form></form>
      </div>

      <button
        className="custom__button"
        type="button"
        onClick={() => setOpen(true)}
      >
        {t("Book Table")}
      </button>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        // detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {/* Your sheet content goes here */}
            <div className="app__modalsheet">
              <div className="app__modalsheet-heading">
                <SubHeading title="Online Reservation" />
                <div className="language">
                  <div className="eng">
                    <img src={pics.gb} alt="English Flag" />
                    <img src={pics.sk} alt="Slovak Flag" />
                  </div>
                </div>
              </div>
              <div className="app__modalsheet-form">
                <form></form>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default ModalSheet;
