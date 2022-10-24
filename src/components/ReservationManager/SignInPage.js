import React, { useRef } from "react";
import { signInWithEmailAndPassword } from "../../firebase";
import SubHeading from "../SubHeading/SubHeading";
import { pics } from "../../constants";

import "./SignInPage.scss";
const SignInPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSignIn(e) {
    e.preventDefault();
    //setLoading(true);
    //check for empty form
    if (!emailRef.current.value) {
      //error
    } else {
      handleSignInLogic(false);
    }
  }

  async function handleSignInLogic() {
    //setError("");
    if (!passwordRef.current.value) {
      //setError(language.write_psd);
      //setLoading(false);
    } else {
      try {
        signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
          .then((result) => {
            if (result.code === "auth/wrong-password") {
              //setError(language.wrong_password);
              //setLoading(false);
            } else if (result.code === "auth/too-many-requests") {
              //setError(language.too_many_requests);
              //setLoading(false);
            }
          })
          .catch(function (error) {
            // setError(language.wrong_password);
            //setLoading(false);
          });
      } catch (e) {
        //setError(language.wrong_password);
        //setLoading(false);
      }
    }
  }
  return (
    <>


      <div className="app__sign_in app__bg app__wrapper section__padding" id="login">
        <div className="app__sign_in-content">
          <div className='app__sign_in-content-heading'>
            <SubHeading title="Admin Log In" />
          </div>
          <div className='app__sign_in-content-input flex__center'>
            <input type='email' ref={emailRef} placeholer='Enter Admin Email'></input>
            <input type='password' ref={passwordRef} placeholer='Enter Admin Password'></input>
            <button onClick={handleSignIn} className="custom__button">Log In</button>
          </div>

        </div>

        <div className="app__sign_in-img">
          <img src={pics.logo} alt="company_logo" />
          <p className="p__opensans">
            &quot;Company Quote Lorem ipsum dolor sit amet.&quot;
          </p>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
