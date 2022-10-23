import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import SignInPage from "./SignInPage";
import { signOutUser } from "../../firebase";
const Reservation = () => {
  const user = useContext(UserContext);

  async function handleLogOut(e) {
    e.preventDefault();
    signOutUser();
  }
  return user ? (
    <>
      <h2>Manager page</h2>
      <button onClick={handleLogOut}>LOGOUT</button>
    </>
  ) : (
    <SignInPage />
  );
};

export default Reservation;
