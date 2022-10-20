/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { SubHeading } from "../../components";
import "./Bartender.scss";
import { pics } from "../../constants";
const Bartender = () => (
  <div className="app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={pics.bartender} alt="chef" />
    </div>
    <div className="app__wrapper_info">
      <SubHeading title="Bartender's Word" />
      <h1 className="headtext__cormorant">What we believe in</h1>

      <div className="app__bartender-content">
        <div className="app__bartender-content_quote">
          <img src={pics.quote} alt="quote" />
          <p className="p__opensans">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            aliquid! Labore, aliquid. Totam quisquam quibusdam voluptas hic illo
            rerum libero quidem sed eius officiis.
          </p>
        </div>
        <p className="p__opensans">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
          aliquid! Labore, aliquid. Totam quisquam quibusdam voluptas hic illo
          rerum libero quidem sed eius officiis, minima inventore accusamus
          aliquam laboriosam harum
        </p>
      </div>

      <div className="app__bartender_sign">
        <p>Vlado Banas</p>
        <p className="p__opensans">Bartender & Founder</p>
        <img src={pics.sign} alt="signature" />
      </div>
    </div>
  </div>
);

export default Bartender;
