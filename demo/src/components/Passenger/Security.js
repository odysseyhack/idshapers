import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { large } from "../shared/grid";
import SecureIcon from "../../images/secure-icon.svg";

class Security extends React.Component {
  render() {
    return (<Wrapper>
    </Wrapper>)
  }
}

const Wrapper = styled.aside`
  height: 100%;

  section {
    background-color: ${theme.main.bg};
    border-radius: 4px;
    box-shadow: 0 5px 6px rgba(63, 61, 75, 0.1);
    color: ${theme.footer.textColor};
    display: none;
    font-size: 0.875rem;
    margin: 0 20px 20px 0;
    padding: 20px;

    ${large(`
      bottom: 50px;
      display: block;
      max-width: 250px;
      position: fixed;
    `)}
  }
  p + p {
    margin-top: 15px;
  }
`;
const Header = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
  h4 {
    font-weight: 600;
    line-height: 1.25;
  }
`;
const Icon = styled.img`
  display: block;
  margin-right: 15px;
  width: 32px;
`;

export default Security;
