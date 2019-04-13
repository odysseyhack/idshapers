import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import Header from "./Header";
import ServiceCard from "../shared/ServiceCard";
import FlightCard from "../shared/FlightCard";
import SERVICES from "../../constants/servicesKlm";

class PassengerHome extends React.Component {
  render() {
    return (<Wrapper>
      <Header />
      <Cards>
      <Container><br/><br/><br/><br/>
      <h3 >MY IDENTITY</h3><br/><br/>
        <ServiceCard
          key={SERVICES.PASSENGER_ID.id}
          name={SERVICES.PASSENGER_ID.name}
          icon={SERVICES.PASSENGER_ID.icon}
          superText={SERVICES.PASSENGER_ID.entity}
          description={SERVICES.PASSENGER_ID.description}
          shareClaims={SERVICES.PASSENGER_ID.requiredClaims}
          shareServices={SERVICES.PASSENGER_ID.requiredServices}
          receiveClaims={SERVICES.PASSENGER_ID.generatedClaims}
          url={SERVICES.PASSENGER_ID.url}
          colors={theme.colors[SERVICES.PASSENGER_ID.id]} />
      </Container>
      </Cards>
      <Cards>
      <h3 ><br/><br/><br/>MY FLIGHTS</h3><br/><br/>
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
      </Cards>
    </Wrapper>)
  }
}

const Hero = styled.div`
  overflow: hidden;
  position: relative;
`;


const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}

  h3 {
    font-size: 1.5rem;
    color: white;
    font-weight: 1000;
    margin: 0 0 60px;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const Cards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(PassengerHome);