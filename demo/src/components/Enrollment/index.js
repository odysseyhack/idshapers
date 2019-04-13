import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Failure from "../shared/Failure";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Smile from "./SmileContainer";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import SERVICES from "../../constants/servicesKlm";

class Enrollment extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title={SERVICES.KLM_ENROLLMENT.entity} logo={SERVICES.KLM_ENROLLMENT.icon} />
      <Container>
        <Switch>
          <Route path="/selfservice/enrollment" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/selfservice/enrollment/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/selfservice/enrollment" />
              <Failure
                heading="Services that issue claims required to get the diploma"
                services={SERVICES.KLM_ENROLLMENT.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/selfservice/enrollment/receive" exact component={Receive} />
          <Route path="/selfservice/enrollment/smile" exact component={Smile} />
          <Route path="/selfservice/enrollment/complete" exact>
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

export default Enrollment;
