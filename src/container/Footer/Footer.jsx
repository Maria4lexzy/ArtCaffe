import React from "react";

import "./Footer.scss";
import { FooterOverlay, Newsletter } from "../../components";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { pics } from "../../constants";
const Footer = () => (
  <div className="app__footer section__padding" id="login">
    <FooterOverlay />
    <Newsletter />

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">Sabinov Slovakia </p>
        <p className="p__opensans">+42158548885</p>
        <p className="p__opensans">+45225265165</p>
      </div>

      <div className="app__footer-links_logo">
        <img src={pics.logo} alt="footer_logo" />
        <p className="p__opensans">
          &quot;Company Quote Lorem ipsum dolor sit amet.&quot;
        </p>
        <img
          src={pics.spoon}
          className="spoon__img" alt="spoon"
          style={{ marginTop: 15 }}
        />
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiFacebook />
          <FiInstagram />
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        <p className="p__opensans">Monday-Friday:</p>
        <p className="p__opensans">18:00 - 23:00</p>
        <p className="p__opensans">Saturday-Sunday:</p>
        <p className="p__opensans">16:00 - 00:00</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">2021 Marpi. All Rights reserved.</p>
    </div>
  </div>
);

export default Footer;
