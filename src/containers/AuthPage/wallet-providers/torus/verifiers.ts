export const GOOGLE = "google";
export const FACEBOOK = "facebook";
export const REDDIT = "reddit";
export const DISCORD = "discord";
export const TWITCH = "twitch";
export const GITHUB = "github";
export const APPLE = "apple";
export const LINKEDIN = "linkedin";
export const TWITTER = "twitter";
export const WEIBO = "weibo";
export const LINE = "line";
export const EMAIL_PASSWORD = "email_password";
export const PASSWORDLESS = "passwordless";
export const HOSTED_EMAIL_PASSWORDLESS = "hosted_email_passwordless";
export const HOSTED_SMS_PASSWORDLESS = "hosted_sms_passwordless";
export const WEBAUTHN = "webauthn";

const ENV = process.env.REACT_APP_ENV === 'production' ? 'prod' : 'dev';

export const verifiers = {
  dev: {
    [GOOGLE]: {
      testnet: {
        name: "Google",
        typeOfLogin: "google",
        verifier: "coldstack-dev-google-testnet",
	      clientId: "152376433285-2aboo2sg8dj3qkpf41li2sd2qtpcagdj.apps.googleusercontent.com",
      },
      mainnet: {
        name: "Google",
        typeOfLogin: "google",
        verifier: "coldstack-dev-google-mainnet",
        clientId: "152376433285-2aboo2sg8dj3qkpf41li2sd2qtpcagdj.apps.googleusercontent.com",
      }
    },
    [FACEBOOK]: {
      testnet: {
        name: "Facebook",
        typeOfLogin: "facebook",
        verifier: "coldstack-dev-facebook-testnet",
        clientId: "1078694586200257",
      },
      mainnet: {
        name: "Facebook",
        typeOfLogin: "facebook",
        verifier: "coldstack-dev-facebook-mainnet",
	      clientId: "1078694586200257",
      },
    },
  },
  prod: {
    [GOOGLE]: {
      testnet: {
        name: "Google",
        typeOfLogin: "google",
        verifier: "coldstack-prod-google-testnet",
        clientId: "152376433285-rockkk650luculcm1tdv6eiq1mcoott2.apps.googleusercontent.com",
      },
      mainnet: {
        name: "Google",
        typeOfLogin: "google",
        verifier: "coldstack-prod-google-mainnet",
        clientId: "152376433285-rockkk650luculcm1tdv6eiq1mcoott2.apps.googleusercontent.com",
      }
    },
    [FACEBOOK]: {
      testnet: {
        name: "Facebook",
        typeOfLogin: "facebook",
        verifier: "coldstack-prod-facebook-testnet",
	      clientId: "1078694586200257",
      },
      mainnet: {
        name: "Facebook",
        typeOfLogin: "facebook",
        verifier: "coldstack-prod-facebook-mainnet",
	      clientId: "1078694586200257",
      },
    },
  }
}[ENV];
