import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import MobileHome from "../components/MobileHome";

const MobileHomePage = props => {
  return (<App>
    <MobileHome />
  </App>);
};

// export default hot(module)(MobileHome);
export default MobileHomePage;
