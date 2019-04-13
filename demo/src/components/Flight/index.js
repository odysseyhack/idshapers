import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Webcam from "react-webcam";

import { showAppDownload } from "../../selectors";
import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import Header from "./Header";
import Card from "../shared/ServiceCard";

class Home extends React.Component {
  render() {
    const { showAppDownload } = this.props;
    return (<Wrapper>
      <Header />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;
const Cards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
