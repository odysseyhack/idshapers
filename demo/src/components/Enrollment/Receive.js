import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/servicesKlm";
import SuccessIcon from "../../images/smiley-face-diploma.svg";
import AttestationModal from "../uport/AttestationContainer";

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
          >Receive your Airport Checkin claim</ThemedExtLink>
        : <ThemedButton className="long" secondary onClick={this.showAttestationModal}>
            Receive your Airport Checkin claim
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.KLM_ENROLLMENT} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your data were succesfully shared with the {SERVICES.KLM_ENROLLMENT.entity}.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your Airport CheckIn claim whenever
              and wherever you need them. {SERVICES.KLM_ENROLLMENT.entity} is going
              to send your new claims to your the APP.
            </p>
          </Card>
        </Col>
        <Col span={3} />
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: SERVICES.KLM_ENROLLMENT.name,
          subHeading: SERVICES.KLM_ENROLLMENT.entity,
          name: SERVICES.KLM_ENROLLMENT.entity,
          logo: SERVICES.KLM_ENROLLMENT.icon,
          colors: theme.colors[SERVICES.KLM_ENROLLMENT.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.KLM_ENROLLMENT.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.KLM_ENROLLMENT.claim]: claimData
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
