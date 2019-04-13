import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import ServiceRequirements from "../shared/ServiceRequirements";
import SidebarLeft from "../shared/SidebarLeft";
import LoginModal from "../uport/LoginContainer";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/servicesKlm";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }
  hideLoginModal = () => {
    this.setState({ loginModal: false });
    document.location.href = "selfservice/enrollment/receive";
  }
  showLoginModal = () => {
    this.setState({ loginModal: true });
  }
  handleLoginSuccess = profile => {
    const { loginModal } = this.state;
    if(loginModal || isMobile()) {
      this.setState({ loginModal: false })
      // const receivedClaim = profile[SERVICES.PASSENGER_ID.claim];
      // if(isValid(receivedClaim).valid) {
        this.props.redirectToReceiveDiploma();
      // } else {
      //   this.props.redirectToDiplomaRequirement();
      // }
    }
  }
  render() {
    const { login } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <LoginLink href={login.url} />
        : <LoginButton onClick={this.showLoginModal} />}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.KLM_ENROLLMENT} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Check in at the airport.</h2>
            <Bullets>
              <li>As a result get full biometric access to security gates, duty free etc. without a need to provide your passport</li>
              <li>Please note that your biometric information (face image) will be shared within the airport entities.</li>
              <li>In case there will be a need for extra information, you will receive a notification in your mobile APP.</li>
              <li>Please note, that your data will be shared for a certain amount of time and 3 days after you leave the airport it will be removed based on GDPR.</li>
            </Bullets>
            <ServiceRequirements service={SERVICES.KLM_ENROLLMENT} />
          </Card>
        </Col>
        <Col span={3} />
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the KLM app."
        infoHeading="You're logging in to"
        issuer={{
          heading: SERVICES.KLM_ENROLLMENT.name,
          subHeading: SERVICES.KLM_ENROLLMENT.entity,
          name: SERVICES.KLM_ENROLLMENT.entity,
          logo: SERVICES.KLM_ENROLLMENT.icon,
          colors: theme.colors[SERVICES.KLM_ENROLLMENT.id]
        }}
        requestedServices={SERVICES.KLM_ENROLLMENT.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const Bullets = styled.ul`
  list-style: disc;
  margin-left: 20px;
  li + li {
    margin-top: 15px;
  }
`;

export default Landing;
