import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { showAppDownload } from "../../selectors";
import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import Header from "./Header";
import PersonCard from "../shared/PersonCard";
import Face1 from "../../images/face1.png";
import Face2 from "../../images/face2.png";


const DID1 = {
  id: "PASSENGER_ID",
  name: "did:p:0x98234u2833122",
  icon: Face1,
  entity: "KLM Airlines",
  description: "Identify yourself with one click. Get a digital Passenger ID. Enjoy seamless travel experience.",
  url: "/passenger",
  claim: "Passenger ID 1",
  isApproaching: false,
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ]
};

const DID2 = {
  id: "CITY_ID",
  name: "did:p:0x1912c8321122",
  icon: Face2,
  entity: "KLM Airlines",
  description: "Identify yourself with one click. Get a digital Passenger ID. Enjoy seamless travel experience.",
  url: "/city",
  isApproaching: true,
  claim: "Passenger ID 2",
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ]
};

const FACEIDS = { DID1, DID2 };
const DATASHARED = { DID1, DID2 };


class Home extends React.Component {
  render() {
    return (<Wrapper>
      <Header />
      <PersonCards>
      <h3>Face IDs shared with you</h3>
        <Container>
          {Object.keys(FACEIDS).map(sid => <PersonCard key={sid}
            name={FACEIDS[sid].name}
            icon={FACEIDS[sid].icon}
            isApproaching={FACEIDS[sid].isApproaching}
            superText={FACEIDS[sid].entity}
            description={FACEIDS[sid].description}
            shareClaims={FACEIDS[sid].requiredClaims}
            shareServices={FACEIDS[sid].requiredServices}
            receiveClaims={FACEIDS[sid].generatedClaims}
            url={FACEIDS[sid].url}
            colors={theme.colors[sid]} />)}
        </Container>
      </PersonCards>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;
const PersonCards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }

  h3 {
    font-size: 1rem;
    color: white;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const DataSharedCards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }

  h3 {
    font-size: 1rem;
    color:white;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;


const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
