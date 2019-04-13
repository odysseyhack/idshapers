import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdInfo, isLoggedIn, isLoading } from "../../selectors";

import PersonalInfo from "./PersonalInfo";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  data: getCityIdInfo(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit(details) {
    console.log('onSubmit')
    console.log(details)
    //dispatch(actions.changeCityIdInfo(details));
    dispatch(actions.redirectToPassengerIdFormSubmit());
  },
  redirectToPassengerHome() {
    dispatch(actions.redirectToPassengerHome());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
