import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import ServiceRequirements from "../shared/ServiceRequirements";
import LoginModal from "../uport/LoginContainer";
import SERVICES from "../../constants/servicesKlm";
import isMobile from "../../utils/isMobile";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }
  hideLoginModal = () => {
    this.setState({ loginModal: false });
  }
  showLoginModal = () => {
    this.setState({ loginModal: true });
  }
  handleLoginSuccess = profile => {
    const { loginModal } = this.state;
    if(loginModal || isMobile()) {
      this.setState({ loginModal: false })
      this.props.redirectToPassengerIdForm();
    }
  }
  render() {
    const { login, profile, redirectToPassengerIdForm } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {profile && profile.did
        ? <LoginButton text="Continue" onClick={redirectToPassengerIdForm} />
        : isMobile()
          ? <LoginLink href={login.url} />
          : <LoginButton onClick={this.showLoginModal} />}
      </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.PASSENGER_ID} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Get Passenger ID</h2>
            <ul>
              <li>ID will be generated as DID - decentralized ID</li>
            </ul>
            <ServiceRequirements service={SERVICES.PASSENGER_ID} />
          </Card>
        </Col>

      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: SERVICES.PASSENGER_ID.name,
          subHeading: SERVICES.PASSENGER_ID.entity,
          name: SERVICES.PASSENGER_ID.entity,
          logo: SERVICES.PASSENGER_ID.icon,
          colors: theme.colors[SERVICES.PASSENGER_ID.id]
        }}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ul {
    list-style: disc;
    margin-left: 20px;
    li + li {
      margin-top: 15px;
    }
  }
`;

export default Landing;
