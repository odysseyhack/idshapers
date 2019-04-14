import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { showAppDownload } from "../../selectors";
import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import Header from "./Header";
import Card from "../shared/PermissionCard";
import Smile from "./SmileContainer";
import Flights from "./FlightsContainer";
import FlightsMain from "./FlightsMain";
import Revoked from "./RevokedContainer";
import SERVICES from "../../constants/sharedpermissions";
import dataShareImage from "../../images/datashare.png";

class Home extends React.Component {
  render() {
    const { showAppDownload } = this.props;
    return (<Wrapper>
      <Container>
        <Switch>
          <Route path="/sharepermissions" exact>
            <React.Fragment>
            <Header/>
            </React.Fragment>
          </Route>
          <Route path="/sharepermissions/shared" exact component={Smile} />
          <Route path="/sharepermissions/flights" exact component={Flights} />
          <Route path="/sharepermissions/flightsMain" exact component={FlightsMain} />
          <Route path="/sharepermissions/revoked" exact component={Revoked} />
        </Switch>
      </Container>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;
const DataShareImage = styled.div`
  background: ${theme.gradient1};
  text-align:center;


  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
