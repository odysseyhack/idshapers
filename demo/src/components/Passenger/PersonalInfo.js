import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import SidebarLeft from "../shared/SidebarLeft";
import Security from "./Security";
import {
  Form,
  FormGroup,
  Label,
  Dropdown,
  textBoxStyle,
  Textbox,
  ThemedButton
} from "../shared/elements";
// import isValid from "../../utils/validateCityIdInfo";
import COUNTRIES from "../../constants/countries";
import SERVICES from "../../constants/servicesKlm";
import SelfiePicture from "../../images/selfie-example.jpeg";
import PassportPicture from "../../images/passport-example.jpg";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        firstName: "",
        lastName: "",
        personalId: "",
        documentId: "",
        documentIssuedCountry: "",
        dob: ""
      },
      validationError: null
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn)
      this.props.redirectToPassengerHome();
    const { data } = this.props;
    this.setState({ details: data });
  }
  componentWillUnmount() {
    clearTimeout(this.errorHandle);
  }
  handleChange = fieldId => ev => {
    const { details } = this.state;
    if(ev.target.type === "checkbox") {
      this.setState({
        details: {
          ...details,
          [fieldId]: ev.target.checked
        }
      });
    } else {
      this.setState({
        details: {
          ...details,
          [fieldId]: ev.target.value
        }
      });
    }
  }
  handleChangeDOB = date => {
    const { details } = this.state;
    this.setState({
      details: {
        ...details,
        dob: dayjs(date).format("MM/DD/YYYY")
      }
    });
  }
  handleSubmit = ev => {
    console.log("handleSubmit")
    ev.preventDefault();
    this.props.onSubmit(this.state.details);
    return false;
  }
  render() {
    const { isLoggedIn } = this.props;
    const { details, validationError } = this.state;
    const {
      firstName,
      lastName,
      personalId,
      documentId,
      documentIssuedCountry,
      dob
    } = details;
    if(!isLoggedIn)
      return null;
    const CTA = () => (<Card.CTA>
      <ThemedButton
        themeId={SERVICES.PASSENGER_ID.id}
        className="long"
        secondary
        onClick={this.handleSubmit}
      >Submit</ThemedButton>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.PASSENGER_ID} active={1} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Personal Information</h2>
            <p>Submit your information to {SERVICES.PASSENGER_ID.entity} to confirm your identity.</p>
            <Form onSubmit={this.handleSubmit}>
              <Grid>
                <Col span={6}>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Textbox
                      value="John"
                      onChange={this.handleChange("firstName")} />
                  </FormGroup>
                </Col>

                <Col span={6}>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Textbox
                      value="Doe"
                      onChange={this.handleChange("lastName")} />
                  </FormGroup>
                </Col>

                  <Col span={6}>
                    <Image src={SelfiePicture}/>
                  </Col>
                  <Col span={6}>
                      <Image src={PassportPicture} />
                  </Col>

                <Col span={6}>
                  <FormGroup>
                    <Label>Date of Birth</Label>
                    <input type="date"
                           className="datepicker"
                           min="1900-01-01"
                           max={dayjs().add(-13, "year").format("YYYY-MM-DD")}
                           onChange={this.handleChange("dob")}
                           placeholder="YYYY-MM-DD"
                           value={dob}
                    />
                  </FormGroup>
                </Col>

                <Col span={6}>
                  <FormGroup>
                    <Label>Personal ID</Label>
                    <Textbox
                        value={personalId}
                        onChange={this.handleChange("personalId")} />
                  </FormGroup>
                </Col>

                <Col span={6}>
                  <FormGroup>
                    <Label>Document ID</Label>
                    <Textbox
                        value={documentId}
                        onChange={this.handleChange("documentId")} />
                  </FormGroup>
                </Col>

                <Col span={5}>
                  <FormGroup>
                    <Label>Document Issued</Label>
                    <Dropdown
                        placeholder="Country"
                        value={documentIssuedCountry}
                        onChange={this.handleChange("documentIssuedCountry")}>
                      <option> Country </option>
                      {COUNTRIES.map(c => (<option key={c.code} value={c.code}>
                        {c.name}
                      </option>))}
                    </Dropdown>
                  </FormGroup>
                </Col>

              </Grid>
              <hr />
              <h4>What’s next?</h4>
              <p>
                Your information will be securely sent to KLM Services and verified.
              </p>
            </Form>
          </Card>
        </Col>
        <Col span={3}>
          <Security />
        </Col>
      </Grid>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  input[type="checkbox"] {
    margin-right: 10px;
  }
  .datepicker {
    ${textBoxStyle}
  }
`;
const ReqdMessage = styled.p``;
const ErrorMsg = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.error};
  margin: 5px 0 0;
  ${props => props.show ? "opacity: 1;" : "opacity: 0;"}
  transition: opacity 0.2s;
`;
const Image = styled.img`
    width: 100%;
`;

export default PersonalInfo;
