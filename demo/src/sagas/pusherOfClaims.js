import { spawn, takeEvery, put, call } from "redux-saga/effects";
import { Credentials } from "uport-credentials";
import { transport } from "uport-transports";
import { verifyJWT } from "did-jwt";

import {
  CRED_INIT,
  CRED_VERIFY,
  REQ_DISCLOSURE,
  SEND_VERIF
} from "../constants/actions";
import {
  initCredentialsSuccess,
  reqDisclosureSuccess,
  saveProfile,
  setLoading,
  verifyCredentialsSuccess,
  sendVerificationSuccess,
} from "../actions";
import createBrokerUrl from "../utils/createBrokerUrl";
import createCallbackUrl from "../utils/createCallbackUrl";
import { addFile, pin } from '../utils/ipfs'

let keypair;
let pusherOfClaims;
let verifiedClaims = [];

async function signAndUploadProfile() {
  if(verifiedClaims.length) {
    return;
  }
  const profile = {
    name: "idshapersdemo",
    description: "idShapers DEMO",
    url: (typeof window !== 'undefined')
      ? `${window.location.protocol}//${window.location.host}`
      : undefined,
    profileImage: {
      "/": "/ipfs/Qmez4bdFmxPknbAoGzHmpjpLjQFChq39h5UMPGiwUHgt8f"
    },
    // bannerImage: {
    //   "/": "/ipfs/QmTFNFu1v4dev6YCDoMuSG9Zi3EubagUJ4LQxoZkMiBPSF"
    // }
  };
  // Put verification onto ipfs
  const jwt = await pusherOfClaims.createVerification({
    sub: keypair.did,
    claim: profile
  });
  const response = await addFile(new Blob([ jwt ]));
  await pin(response.Hash);
  verifiedClaims.unshift(`/ipfs/${response.Hash}`);
}

function* initCredentials() {
  keypair = Credentials.createIdentity();
  pusherOfClaims = new Credentials(keypair);
  yield call(signAndUploadProfile);
  yield put(initCredentialsSuccess());
}

function* verifyCredentials (action) {
  const { token } = action;
  yield put(setLoading(CRED_VERIFY, true));
  if(!pusherOfClaims)
    yield call(initCredentials);
  try {
    const res = yield call(verifyJWT, token, { audience: pusherOfClaims.did });
    const profile = yield call(
      pusherOfClaims.processDisclosurePayload.bind(pusherOfClaims),
      res
    );
    profile.publicEncKey = profile.boxPub;
    yield put(verifyCredentialsSuccess(profile));
    yield put(saveProfile(profile));
  } catch(ex) {
    console.error(ex);
  }
  yield put(setLoading(CRED_VERIFY, false));
}

function* requestDisclosure(action) {
  const { callbackId, requestedClaims, isMobile } = action;
  const callbackUrl = isMobile
    ? createCallbackUrl(callbackId)
    : createBrokerUrl(callbackId);

  const expiresIn = 2 * 60; // seconds
  yield put(setLoading(REQ_DISCLOSURE, true));
  if(!pusherOfClaims) {
    yield call(initCredentials);
  }
  const jwt = yield call(
    pusherOfClaims.createDisclosureRequest.bind(pusherOfClaims),
    {
      requested: [ "name" ],
      verified: requestedClaims,
      notifications: !isMobile,
      callbackUrl,
      accountType: "none",
      vc: verifiedClaims
    },
    expiresIn
  );
  if(isMobile) {
    yield put(reqDisclosureSuccess(
      callbackId,
      `me.uport:req/${jwt}?callback_type=redirect&redirect_url=${callbackUrl}`
    ));
  } else {
    yield put(reqDisclosureSuccess(callbackId, `https://id.uport.me/req/${jwt}`));
  }
  yield put(setLoading(REQ_DISCLOSURE, false));
}

function* sendVerification(action) {
  const callbackId = action.callbackId;
  const profile = action.profile;
  const claim = action.claim;
  const isMobile = action.isMobile;
  const pushToken = profile.pushToken;
  const publicEncKey = profile.publicEncKey;
  const callbackUrl = isMobile
    ? createCallbackUrl(callbackId)
    : createBrokerUrl(callbackId);
  yield put(setLoading(SEND_VERIF, true));
  if(!pusherOfClaims) {
    yield call(initCredentials);
  }
  const jwt = yield call(
    pusherOfClaims.createVerification.bind(pusherOfClaims),
    {
      sub: profile.did,
      vc: verifiedClaims,
      claim,
      callbackUrl
    }
  );
  if(isMobile) {
    yield put(sendVerificationSuccess(
      callbackId,
      `me.uport:req/${jwt}?callback_type=redirect&redirect_url=${callbackUrl}`
    ));
  } else {
    if(pushToken && publicEncKey) {
      transport.push.send(pushToken, publicEncKey)(jwt);
      yield put(sendVerificationSuccess(callbackId, `https://id.uport.me/req/${jwt}`, true));
    } else {
      yield put(sendVerificationSuccess(callbackId, `https://id.uport.me/req/${jwt}`));
    }
  }
  yield put(setLoading(SEND_VERIF, false));
}

export default function* () {
  yield spawn(takeEvery, CRED_INIT, initCredentials);
  yield spawn(takeEvery, CRED_VERIFY, verifyCredentials);
  yield spawn(takeEvery, REQ_DISCLOSURE, requestDisclosure);
  yield spawn(takeEvery, SEND_VERIF, sendVerification);
}
