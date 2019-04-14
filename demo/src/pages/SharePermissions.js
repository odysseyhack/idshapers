import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import SharePermissions from "../components/SharePermissions";

const MobileEnrollmentPage = props => {
  return (<App>
    <SharePermissions />
  </App>);
};

// export default hot(module)(MobileEnrollmentPage);
export default MobileEnrollmentPage;
