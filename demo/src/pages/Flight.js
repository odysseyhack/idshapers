import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import Flight from "../components/Flight";

const FlightPage = props => {
  return (<App>
    <Flight />
  </App>);
};

// export default hot(module)(MainPage);
export default FlightPage;
