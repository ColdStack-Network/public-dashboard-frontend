import { useCallback } from 'react';
import UseWeb3 from "../../../../helpers/web3/UseWeb3";
import Web3 from "web3";
import TorusSdk, { TORUS_NETWORK_TYPE } from "@toruslabs/customauth";
import {
  verifiers,
  GOOGLE, APPLE, GITHUB, LINKEDIN, TWITTER, WEIBO, LINE,
  EMAIL_PASSWORD, PASSWORDLESS, HOSTED_EMAIL_PASSWORDLESS, HOSTED_SMS_PASSWORDLESS
} from "./verifiers";
import { NETWORKS } from "../../../../helpers/constants";

const { TESTNET, MAINNET } = NETWORKS;

const AUTH_DOMAIN = "https://torus-test.auth0.com";

let Torus, selectedNetwork = TESTNET, loginHint = "";

const _loginToConnectionMap = (loginHint) => {
  return {
    [EMAIL_PASSWORD]: { domain: AUTH_DOMAIN },
    [PASSWORDLESS]: { domain: AUTH_DOMAIN, login_hint: loginHint },
    [HOSTED_EMAIL_PASSWORDLESS]: {
      domain: AUTH_DOMAIN,
      verifierIdField: "name",
      connection: "",
      isVerifierIdCaseSensitive: false,
    },
    [HOSTED_SMS_PASSWORDLESS]: {
      domain: AUTH_DOMAIN,
      verifierIdField: "name",
      connection: "",
    },
    [APPLE]: { domain: AUTH_DOMAIN },
    [GITHUB]: { domain: AUTH_DOMAIN },
    [LINKEDIN]: { domain: AUTH_DOMAIN },
    [TWITTER]: { domain: AUTH_DOMAIN },
    [WEIBO]: { domain: AUTH_DOMAIN },
    [LINE]: { domain: AUTH_DOMAIN },
  };
};

const activateSDK = async () => {
  const torusdirectsdk = new TorusSdk({
    baseUrl: window.location.origin,
    enableLogging: true,
    network: selectedNetwork as TORUS_NETWORK_TYPE,
  });

  await torusdirectsdk.init({ skipSw: false });

  Torus = torusdirectsdk;
  // activateWallet('torus')
}

export const setNetwork = (network) => {
  if (selectedNetwork !== network) {
    selectedNetwork = network;

    activateSDK();
  }
}

const mockedDetails = {
  "publicAddress": "0xe58e971DE8861576CD67F651762920208c62E010",
  "privateKey": "5016eaa96d816f8d2b40f04b13869f206e630081333ebd93ff9cb9aea6196265",
  "metadataNonce": "0",
  "typeOfUser": "v1",
  "pubKey": {
    "pub_key_X": "3992d0a86e38aaa74df518e638ca7f288e8006306397523a732c770b674a2162",
    "pub_key_Y": "e9511ebc56541a0bf13363cf340093217697f6211c3b3a7e117b28d0fc0ab0c6"
  },
  "userInfo": {
    "email": "moiserge.k@gmail.com",
    "name": "Sergey Kovalev",
    "profileImage": "https://lh3.googleusercontent.com/a-/AOh14GgcwS4MvSYsPDm9AKLD3alQ_V9aUSt4Gqqd4u6I3g=s96-c", "verifier": "coldstack-dev-google-testnet-1", "verifierId": "moiserge.k@gmail.com", "typeOfLogin": "google", "accessToken": "ya29.a0ARrdaM9thFcMIxtrBkutqT-_a09EBKalcLb-J6asaMCM_darOQdZu9nh3jk4PXsV2BdakZ8mg9QKfB-H5zk3tLc42taMozPCqZKraiFnBjBCjhK08E2hu1LCCDgc82Bt0YTL0N5e_QW6w0BZTXoN7EyAq4K7", "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxODkyZWI0OWQ3ZWY5YWRmOGIyZTE0YzA1Y2EwZDAzMjcxNGEyMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNzg2Njk5NDA1ODYtMmdtdGgyOWgxaTlsN2d0MzFkczhnZjBpN3AyaXVjNXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNzg2Njk5NDA1ODYtMmdtdGgyOWgxaTlsN2d0MzFkczhnZjBpN3AyaXVjNXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE4NTczMzA4NjYwNjAzNTc3MTgiLCJlbWFpbCI6Im1vaXNlcmdlLmtAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJFb2NJc0t4ZGpCOENTMHpXeGR4ZmhRIiwibm9uY2UiOiIwNHFjM3NtYnB1cmoiLCJuYW1lIjoiU2VyZ2V5IEtvdmFsZXYiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2djd1M0TXZTWXNQRG05QUtMRDNhbFFfVjlhVVN0NEdxcWQ0dTZJM2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2VyZ2V5IiwiZmFtaWx5X25hbWUiOiJLb3ZhbGV2IiwibG9jYWxlIjoicnUiLCJpYXQiOjE2Mzk3NTE3ODIsImV4cCI6MTYzOTc1NTM4MiwianRpIjoiMDk2ZjRhNTA0NjM4NjQ1ODMxNjkyZWM0MjIzYzZkMDMzZjAxZjM3YiJ9.jB0qYqgZ4MvsCntBpnwgsB3YzT6VfJfeqvagIuNUodaNWf2-lHBT05Yt4sXug7GAuwfR-Phz-SjrKm975w7gbkC9uMYiA1slLoB3rSeoc6lhan2mXPYDfsF9LHZap0mPo9RrTgQmmxJmepccT1p0Nf5vN6nbat1VgIEIzn_FAIbf4VvBVFSOcinPNfAYu7FMb8tUiP5xeDAqu34xW6kKbLygrbxMj0eSebS35rvDe6Zak7DrLHpgliCgqLBrLQZ3A6nmHaE7hHDIyE_2hBcDtTI4Sw4jeSb_8ZsC9ATpsxbe29j_AsNj3gpxR2G-uwFVlCRxiNbMdXk8s8V1rsVC9g", "state": { "instanceId": "04qc3smbpurj", "verifier": "coldstack-dev-google-testnet-1", "typeOfLogin": "google", "redirectToOpener": false }, "token_type": "Bearer", "expires_in": "3598", "scope": "email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email",
    "authuser": "0",
    "prompt": "consent"
  }
}

export const login = async (selectedVerifier, selectedProvider) => {
  try {
    await activateSDK();
    const jwtParams = _loginToConnectionMap(loginHint)[selectedVerifier] || {};
    const { typeOfLogin, clientId, verifier } = verifiers[selectedVerifier][selectedProvider];
    const loginDetails = await Torus.triggerLogin({
      typeOfLogin,
      verifier,
      clientId,
      jwtParams,
    });

    return loginDetails;
  } catch (error) {
    console.error(error.message)
    console.error(error, "login caught");
  }
};

const useTorus = (cb) => useCallback(cb, [cb]);

export default useTorus;
