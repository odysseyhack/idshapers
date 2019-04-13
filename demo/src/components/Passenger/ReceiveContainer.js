import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortVerification, getCityIdInfo, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  data: getCityIdInfo(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit(details) {
    dispatch(actions.changeCityIdInfo(details));
    dispatch(actions.redirectToPassengerIdFormSubmit());
  },
  redirectToPassengerHome() {
    dispatch(actions.redirectToPassengerHome());
  },
  redirectToPassengerIdForm() {
    dispatch(actions.redirectToPassengerIdForm());
  },
  redirectToCityIdReceived() {
    dispatch(actions.redirectToCityIdReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);
