import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import { CapsuleLinkButton } from "../shared/elements";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/servicesKlm";
import SuccessIcon from "../../images/smiley-face-diploma.svg";
import AttestationModal from "../uport/AttestationContainer";
import Webcam from "react-webcam";

const claimData = {
  "Airport name": SERVICES.KLM_ENROLLMENT.entity,
  "Airport check in time": (new Date()).toDateString(),
  "Destination airport": "Vilnius Airport",
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    // if(!this.props.isLoggedIn) {
    //   this.props.redirectToDiplomaHome();
    // } else if(!isValid(this.props.cityIdClaim).valid) {
    //   this.props.redirectToDiplomaRequirement();
    // }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToDiplomaReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { cityIdClaim, isLoggedIn, verification, redirectToDiplomaReceived } = this.props;
    // if(!isLoggedIn || !isValid(cityIdClaim).valid)
    //   return null;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.KLM_ENROLLMENT.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToDiplomaReceived}
          >You are good to go!</ThemedExtLink>
        : <ThemedButton className="long" secondary onClick={this.showAttestationModal}>
            Receive your Airport Checkin claim
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.KLM_ENROLLMENT} active={2} />
        <Col span={6}>
         <CapsuleLinkButton to="/">Home</CapsuleLinkButton>
         <CapsuleLinkButton to="/selfservice/enrollment/receive">Proceed</CapsuleLinkButton><br/>
          <br/>
          <Webcam/>
        </Col>
        <Col span={3} />
      </Grid>
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
