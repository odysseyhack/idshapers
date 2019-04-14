import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isMobile from "../../utils/isMobile";
import AttestationModal from "../uport/AttestationContainer";
import SERVICES from "../../constants/servicesKlm";
import {
    SubmitPersonalDataToKLMService,
    SelfiePhotoClaim,
    FacePrintClaim,
    DocumentPhotoClaim,
} from "../../sagas/klmVerificationService";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attestationModal: false
        };
    }
    componentDidMount() {
    }
    hideAttestationModal = () => {
        this.setState({
            attestationModal: false
        });
    }
    showAttestationModal = () => {
        this.setState({
            attestationModal: true
        });
    }

    passengerDid = "did:uport:0x000000000000000000000000000000000000000A"

    render() {
        const { attestationModal } = this.state;
        const { verification, data, redirectToHome } = this.props;

        let passengerGeneratedClaims = [
            SelfiePhotoClaim,
            FacePrintClaim,
            DocumentPhotoClaim
        ]

        let klmVerifiedClaims = SubmitPersonalDataToKLMService(this.passengerDid, passengerGeneratedClaims)

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

        <b>Your did:</b>
        <JsonClaims>
        {this.passengerDid}
        </JsonClaims>

        <p>Your information has been succesfully verified by KLM services. Your Passenger ID is ready to be issued.</p>
        <p>Your submitted information was splitted into verifable claims. All claims are stored in your device and can be shared with asking your permission.</p>
        <p>Submitted data from App to KLM service with personal data:</p>

        <p>Claims generated from uploaded selfie picture and passport picture in mobile App:</p>
        <JsonClaims>
        {passengerGeneratedClaims.map((claim, i) => {
                let jsonString = JSON.stringify(claim, null, 2)
                return (<JsonClaim key={i}><pre>{jsonString}</pre></JsonClaim>)
            })}
        </JsonClaims>

        <p>KLM generated and verified claims from passenger submitted personal data:</p>
        <JsonClaims>
        {klmVerifiedClaims.map((claim, i) => {
                let jsonString = JSON.stringify(claim, null, 2)
                return (<JsonClaim key={i}><pre>{jsonString}</pre></JsonClaim>)
            })}
        </JsonClaims>

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
