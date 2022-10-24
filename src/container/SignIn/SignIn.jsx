import React from "react";

import "./SignIn.scss";
import { SubHeading } from "../../components";

import { pics } from "../../constants";
const SignIn = () => (
  <div className="app__sign_in app__bg app__wrapper section__padding" id="login">
    <div className="app__sign_in-content">
      <div className='app__sign_in-content-heading'>

        <SubHeading title="Admin Log In" />
      </div>
      <div className='app__sign_in-content-input flex__center'>
        <input type='email' placeholer='Enter Admin Email'></input>
        <input type='password' placeholer='Enter Admin Password'></input>
        <button className="custom__button">Log In</button>
      </div>

    </div>

    <div className="app__sign_in-img">
      <img src={pics.logo} alt="company_logo" />
      <p className="p__opensans">
        &quot;Company Quote Lorem ipsum dolor sit amet.&quot;
      </p>
    </div>
  </div>
);

export default SignIn;
