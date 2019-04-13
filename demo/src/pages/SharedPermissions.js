import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import SharedPermissions from "../components/SharedPermissions";

const SharedPermissionsPage = props => {
  return (<App>
    <SharedPermissions />
  </App>);
};

// export default hot(module)(SharedPermissionsPage);
export default SharedPermissionsPage;
