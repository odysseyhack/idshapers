import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import AttestationModal from "../uport/AttestationContainer";
import SERVICES from "../../constants/servicesKlm";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    /*if(!this.props.isLoggedIn) {
      this.props.redirectToPassengerHome();
    } else if(!isValid(this.props.data).valid) {
      this.props.redirectToPassengerIdForm();
    }
    */
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToCityIdReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { verification, data, redirectToCityIdReceived, redirectToHome } = this.props;
    /*
    if(!this.props.isLoggedIn || !isValid(this.props.data).valid)
      return null;
    */

    let firstNameClaim = {
        type: "firstName",
        value: "John",
        issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
        issuedDate: "2019-04-12",
        signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }
    let lastNameClaim = {
        type: "lastName",
        value: "Doe",
        issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
        issuedDate: "2019-04-12",
        signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let birthDateClaim = {
      type: "birthDate",
      value: "2000-01-01",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let personalIdClaim = {
      type: "personalId",
      value: "3001112323233434",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let documentIdClaim = {
      type: "602243343454",
      value: "2000-01-01",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let selfiePhotoClaim = {
      type: "selfiePhoto",
      value: "BASE64:f52f2f29ff8ff",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let facePrintClaim = {
      type: "facePrint",
      value: "0FFFAFAFFFFFFFFFFFFFFFFF...",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let documentPhotoClaim = {
      type: "documentPhoto",
      value: "BASE64:ff8f8fff4f5ff",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    // these are new generated claims
    let documentCertifiedClaim = {
      type: "documentCertified",
      value: true,
      passengerId: "0x11486054a6ad2c0b685cd89ce0ba018e210d501e",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let boardingpassValidClaim = {
      type: "boardingpassValid",
      value: true,
      passengerId: "0x11486054a6ad2c0b685cd89ce0ba018e210d501e",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let taxFreeRegionClaim = {
      type: "taxFreeRegion",
      value: true,
      passengerId: "0x11486054a6ad2c0b685cd89ce0ba018e210d501e",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let membershipProofClaim = {
      type: "membershipProof",
      value: true,
      passengerId: "0x11486054a6ad2c0b685cd89ce0ba018e210d501e",
      issuer: "0xKLM00054a6ad2c0b685cd89ce0ba018e210d501e",
      issuedDate: "2019-04-12",
      signature: "0x31486054a6ad2c0b685cd89ce0ba018e210d501e"
    }

    let claims = [
        firstNameClaim,
        lastNameClaim,
        birthDateClaim,
        personalIdClaim,
        documentIdClaim,
        selfiePhotoClaim,
        facePrintClaim,
        documentPhotoClaim,
        documentCertifiedClaim,
        boardingpassValidClaim,
        taxFreeRegionClaim,
        membershipProofClaim,
    ]

    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.PASSENGER_ID.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToHome}
          >Receive City ID</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES.PASSENGER_ID.id}
            className="long" secondary onClick={redirectToHome}
          >
            Back to Home page
          </ThemedButton>}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.PASSENGER_ID} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your information has been succesfully verified by KLM services. Your Passenger ID is ready to be issued.</p>
            <p>Your submitted information was splitted into verifable claims. All claims are stored in your device and can be shared with asking your permission.</p>
            <p>KLM verified Claims:</p>

            <JsonClaims>
              {claims.map((claim, i) => {
                let jsonString = JSON.stringify(claim, null, 2)
                return (<JsonClaim key={i}><pre>{jsonString}</pre></JsonClaim>)
              })}
            </JsonClaims>


              <p>KLM generated verified Claims:</p>

              <JsonClaims>
                  {claims.map((claim, i) => {
                      let jsonString = JSON.stringify(claim, null, 2)
                      return (<JsonClaim key={i}><pre>{jsonString}</pre></JsonClaim>)
                  })}
              </JsonClaims>

            <hr />

            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to Airport
              whenever and wherever you need them. {SERVICES.PASSENGER_ID.entity} is
              going to send your new ID claims to your uPort app.
            </p>
          </Card>
        </Col>
        <Col span={3}>
        </Col>
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: SERVICES.PASSENGER_ID.name,
          subHeading: SERVICES.PASSENGER_ID.entity,
          name: SERVICES.PASSENGER_ID.entity,
          logo: SERVICES.PASSENGER_ID.icon,
          colors: theme.colors[SERVICES.PASSENGER_ID.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.PASSENGER_ID.generatedClaims.map(c => ({
          name: c.name,
          value: data[c.id]
        }))}
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.PASSENGER_ID.claim]: data
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const JsonClaims = styled.ol`
    background: #EEEDF4;
    border-radius: 5px;
    margin: 10px 0;
    padding: 20px 32px;
    max-height: 200px;
    overflow: scroll;
`;
const JsonClaim = styled.div``;

export default Landing;
