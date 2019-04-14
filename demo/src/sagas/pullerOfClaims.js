import { takeEvery, put, call } from "redux-saga/effects";

import { POLL_CHASQUI } from "../constants/actions";
import createPullerUrl from "../utils/createPullerUrl";
import isJWT from "../utils/isJWT";
import {
  pollChasquiSuccess
  // setLoading
} from "../actions";
import request from "../utils/request";

const delay = async () => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 2000)
});

const pollUrl = async url => {
  const getContent = async () => {
    const response = await request(url, {
      type: "get",
      dataType: "json"
    });
    const data = response.json;
    if(!data)
      throw new Error(`No response from ${url}`);
    if(data.status !== "success")
      throw new Error(`Failed response from ${url}`);
    const content = data && data.message && data.message.content;
    if(content && content.length) {
      try {
        const contentJSON = JSON.parse(content);
        if(isJWT(contentJSON.access_token))
          return contentJSON.access_token;
      } catch(ex) {
        console.log(ex);
        return null;
      }
    }
  };
  let content = await getContent();
  while(!content) {
    await delay();
    content = await getContent();
  }
  return content;
};

function* pollClaims(action) {
  // yield put(setLoading(POLL_CHASQUI, true));
  try {
    const { callbackId } = action;
    const response = yield call(pollUrl, createPullerUrl(callbackId));
    yield put(pollChasquiSuccess(callbackId, response));
  } catch(ex) {
    console.log(ex);
  }
  // yield put(setLoading(POLL_CHASQUI, false));
};

export default function* () {
  yield takeEvery(POLL_CHASQUI, pollClaims);
}
