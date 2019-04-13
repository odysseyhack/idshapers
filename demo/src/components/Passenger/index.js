import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import PersonalInfo from "./PersonalInfoContainer";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import SERVICES from "../../constants/servicesKlm";

class Passenger extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title={SERVICES.PASSENGER_ID.entity} logo={SERVICES.PASSENGER_ID.icon} />
      <Container>
        <Switch>
          <Route path="/passenger" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/passenger/login" exact>
            login
          </Route>
          <Route path="/passenger/personalinfo" exact>
            <React.Fragment>
              <BackButton url="/passenger" />
              <PersonalInfo />
            </React.Fragment>
          </Route>
          <Route path="/passenger/submitted" exact component={Receive} />
          <Route path="/passenger/complete" exact>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <ClaimReceived />
            </React.Fragment>
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default Passenger;
