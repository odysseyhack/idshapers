import { spawn } from "redux-saga/effects";

import redirects from "./redirects";
import pollerOfClaims from "./pullerOfClaims";
// import storage from "./storage";

export default function* () {
  yield spawn(pollerOfClaims);
  yield spawn(redirects);
  // yield spawn(storage);
}
