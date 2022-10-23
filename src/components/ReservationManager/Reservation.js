import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const Reservation = () => {
  const user = useContext(UserContext);

  return user ? <>Manager page</> : <>You don't have acces to this page</>;
};

export default Reservation;
