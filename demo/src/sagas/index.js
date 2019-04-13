import { spawn } from "redux-saga/effects";

import redirects from "./redirects";
// import storage from "./storage";

export default function* () {
  yield spawn(redirects);
  // yield spawn(storage);
}
