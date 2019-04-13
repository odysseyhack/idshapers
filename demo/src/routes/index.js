import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../utils/history";
import MobileHomePage from "../pages/MobileHome";
import PassengerPage from "../pages/Passenger";
import SelfServiceHomePage from "../pages/SelfServiceHome";
import SharedPermissionsPage from "../pages/SharedPermissions";
import EnrollmentPage from "../pages/Enrollment";
import FlightPage from "../pages/Flight";
import RedirectPage from "../pages/Redirect";
import MainPage from "../pages/Main";
import BackOfficePage from "../pages/BackOffice";
import isMobile from "../utils/isMobile";

export default () => (<Router history={history}>
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/main" component={MainPage} />
    <Route path="/mobile" component={MobileHomePage} />
    <Route path="/passenger" component={PassengerPage} />
    <Route path="/selfservice" component={SelfServiceHomePage} />
    <Route path="/selfservice/enrollment" component={EnrollmentPage} />
    <Route path="/flight" component={FlightPage} />
    <Route path="/sharedpermissions" component={SharedPermissionsPage} />
    <Route path="/backoffice" component={BackOfficePage} />
    <Route path="/redirect" component={RedirectPage} />
    <Route path="/detect" exact>
        {() => <main>
            <p>User Agent: {navigator.userAgent}</p>
            <br />
            <h1>Is Mobile: {isMobile() ? "yes" : "no"} </h1>
        </main>}
    </Route>
  </Switch>
</Router>);
