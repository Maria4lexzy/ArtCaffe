import React, { Component, createContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.setState({ user });
        // ...
      } else {
        // User is signed out
        // ...
        this.setState({ user: null });
      }
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
