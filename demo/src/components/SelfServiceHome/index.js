import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "./Header";

class Home extends React.Component {
  render() {
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

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Home);
