import React from "react";

import "./AboutUs.scss";
import { pics } from "../../constants";
const AboutUs = () => (
  <div
    className="app__aboutus app__bg flex__center section__padding"
    id="about"
  >
    <div className="app__aboutus-overlay flex__center">
      <img src={pics.A} alt="A letter" />
    </div>
    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content--about">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src={pics.spoon} alt="about spoon" className="spoon__img" />
        <p className="p__opensans">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
          consequatur. Sunt, itaque aperiam? Vel, aliquam eius.
        </p>
        <button type="button" className="custom__button">
          Read more
        </button>
      </div>
      <div className="app__aboutus-content--drink">
        <img src={pics.cocktailsplash} alt="knife" />
      </div>
      <div className="app__aboutus-content--history">
        <h1 className="headtext__cormorant">Our History</h1>
        <img src={pics.spoon} alt="about spoon" className="spoon__img" />
        <p className="p__opensans">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
          consequatur. Sunt, itaque aperiam? Vel, aliquam eius.
        </p>
        <button type="button" className="custom__button">
          Read more
        </button>
      </div>
    </div>
  </div>
);

export default AboutUs;
