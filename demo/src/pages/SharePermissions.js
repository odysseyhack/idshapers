import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import SharePermissions from "../components/SharePermissions";

const SharePermissionsPage = props => {
  return (<App>
    <SharePermissions />
  </App>);
};

// export default hot(module)(SharePermissionsPage);
export default SharePermissionsPage;
