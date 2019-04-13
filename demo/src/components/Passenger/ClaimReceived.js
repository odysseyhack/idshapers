import React from "react";
import styled from "styled-components";

import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import getDependentServices from "../../utils/getDependentServices";
import SuccessIcon from "../../images/congratulations-city.svg";
import Services from "../shared/Services";
import LikeDemo from "../shared/LikeDemo";
import SERVICES from "../../constants/servicesKlm";

class ClaimReceived extends React.Component {
  componentDidMount() {
    if(!this.props.isLoggedIn || !isValid(this.props.data).valid) {
      this.props.redirectToPassengerHome();
    }
  }
  render() {
    const { data, redirectToHome, isLoggedIn } = this.props;
    if(!isLoggedIn || !isValid(data).valid)
      return null;
    return (<Wrapper>
      <Grid>
        <Col span={3} />
        <Col span={6}>
          <Card>
            <h2>Congratulations!</h2>
            <p>You received your Schipol Airport Check In confirmation.
              Your confirmation is stored in your app.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <Services
              heading="Services that honor City ID claims"
              data={getDependentServices(SERVICES.PASSENGER_ID.id)} />
            <ThemedButton themeId={SERVICES.PASSENGER_ID.id} secondary onClick={redirectToHome}>
              View All
            </ThemedButton>
          </Card>
        </Col>
        <Col span={3}>
          <LikeDemo />
        </Col>
      </Grid>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  .card__content {
    padding-bottom: 30px;
  }
  ${ThemedButton} {
    margin: 30px auto 0;
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
  max-width: 100%;
`;

export default ClaimReceived;
