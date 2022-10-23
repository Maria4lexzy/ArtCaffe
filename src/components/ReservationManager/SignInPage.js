import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "../../firebase";

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
      <form action="/action_page.php">
        <label>First name:</label>
        <input type="text" id="fname" name="fname" ref={emailRef} />
        <label>Last name:</label>
        <input type="password" id="lname" name="lname" ref={passwordRef} />
        <button onClick={handleSignIn}>SIGNIN</button>
      </form>
    </>
  );
};
export default SignInPage;
