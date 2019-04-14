import React from "react";
import styled from "styled-components";

import { large, medium, mediumOnly } from "../shared/grid";
import * as theme from "../shared/theme";
import { CapsuleLinkButton } from "../shared/elements";
import headerImage from "../../images/home-header.svg";
import uPortLogo from "../../images/airport-logo.png";
import cityIdIcon from "../../images/city-id-icon.svg";
import uPortAppIcon from "../../images/uport-app-icon.svg";
import servicesIcon from "../../images/services-icon.svg";
import history from "../../utils/history";
import dataShareImage from "../../images/datashare.png";

class Header extends React.Component {
  state = {
    devClickCount: 0
  }
  incDevClickCount = () => {
    if(this.state.devClickCount > 6) {
      this.setState({ devClickCount: 0 });
      history.push("/detect");
    } else {
      this.setState({ devClickCount: this.state.devClickCount + 1 });
   
    }
  }
  onClickButton () {
    window.location.reload()
  }
  render() {
    return (
      <Hero.Welcome>
        <br/><br/>
        <h1>Data to be shared.</h1><br/><h2></h2>
        <br/>
              <DataShareImage>
      <img src={dataShareImage} alt="datashare"/>
      </DataShareImage>
         <br/><br/><CapsuleLinkButton onClick="onClickButton" to="/sharepermissions/flights">Agree</CapsuleLinkButton><br/><br/><br/>
      </Hero.Welcome>);
  }
}

const DataShareImage = styled.div`
  background: ${theme.gradient1};
  text-align:center;
`;


const Hero = styled.div`
  overflow: hidden;
  position: relative;
`;
Hero.Content = styled.div`
  background: ${theme.gradient1};
  padding: 60px 20px 0;
  text-align:center;
  color: #fff;
  ${medium("padding: 60px 20vw 0;")}
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
Hero.Steps = styled.ul`
  align-items: baseline;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${medium("display: flex;")}
`;
Hero.Step = styled.li`
  flex: 1;
  & + & {
    margin: 60px 0 0;
  }
  text-align: center;
  ${medium(`
    & + & {
      margin: 0 0 0 40px;
    }
  `)}
  h4 {
    font-weight: 600;
    margin: 10px 0;
  }
`;
Hero.Step.Icon = styled.img`

`;
Hero.Welcome = styled.div`
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
const Logo = styled.img`
  display: block;
  margin: 10px auto 70px;
  width: 32px;
`;

export default Header;
