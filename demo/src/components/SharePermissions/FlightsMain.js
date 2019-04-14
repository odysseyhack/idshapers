import React from "react";
import styled from "styled-components";

import { large, medium, mediumOnly } from "../shared/grid";
import { Container } from "../shared/grid";

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
import dataSharedImage from "../../images/datashared.png";
import FlightCard from "../shared/FlightCardMain";
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
      <Hero.Welcome>
        <br/><br/><h3>MY FLIGHTS</h3><br/><br/>
        <Container>
          {Object.keys(SERVICES.PASSENGER_FLIGHTS).map(sid => <FlightCard
            key={SERVICES.PASSENGER_FLIGHTS[sid].id}
            name={SERVICES.PASSENGER_FLIGHTS[sid].name}
            icon={SERVICES.PASSENGER_FLIGHTS[sid].icon}
            superText={SERVICES.PASSENGER_FLIGHTS[sid].entity}
            description={SERVICES.PASSENGER_FLIGHTS[sid].description}
            shareClaims={SERVICES.PASSENGER_FLIGHTS[sid].requiredClaims}
            shareServices={SERVICES.PASSENGER_FLIGHTS[sid].requiredServices}
            receiveClaims={SERVICES.PASSENGER_FLIGHTS[sid].generatedClaims}
            url={SERVICES.PASSENGER_FLIGHTS[sid].url}
            colors={theme.colors[SERVICES.PASSENGER_FLIGHTS[sid].id]} />)}
        </Container>
      </Hero.Welcome>
          
    </Wrapper>)
  }
}


const Hero = styled.div`
  overflow: hidden;
  position: relative;
`;
Hero.Content = styled.div`
  background: ${theme.gradient1};
  padding: 60px 20px 0;
  text-align:center;
  color: #fff;
  img {
    max-width:400px;
    text-align:center;
  }
  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 60px;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${CapsuleLinkButton} {
    font-size: 1rem;
    margin-top: 20px;
  }

  hr {
    border: none;
    border-top: solid 1px #fff;
    height: 1px;
    margin: 80px auto;
    width:  120px;
  }
`;

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

Hero.Welcome = styled.div`
  background-size: cover;
  color: ${theme.homeHeader.textColor};
  padding: 2vh 20px 10vh;
  position: relative;
  z-index: 2;
  text-align: center;
  ${large("padding: 5vh 30vw 25vh;")}
  ${mediumOnly("padding: 5vh 25vw 25vh;")}

  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 15px;
    text-transform: uppercase;
    ${medium("font-size: 1.5rem;")}
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    ${medium("font-size: 4.25rem;")}
  }
  p {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    ${medium("font-size: 1.25rem;")}
  }

  ${CapsuleLinkButton} {
    font-size: 1rem;
    margin-top: 20px;
  }
`;

export default Landing;
