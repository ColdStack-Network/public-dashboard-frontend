import axios from "axios";
import { LocalStorage } from "helpers/localStorage";
import { useEffect, useRef } from "react";
import moment from "moment";
import io from "socket.io-client";
import "moment/locale/en-gb";
import { AppConfig } from "config";

export const formatDate = (date) => {
  /*Mar 12, 2021 03:25 AM*/
  return moment(date).format("MMM D, YYYY hh:mm A");
};
export const formatDateTransactions = (date) => {
  /*03.09.2021 14:23*/
  return moment(date).format("DD.MM.YYYY hh:mm ");
};

export const { baseUrl, urlAuthNode, apiUrl, withdrawalUrl, depositingWallet, wsUrl, rpcUrl, type, technicalProcess } =
  AppConfig;
export function getToken() {
  return LocalStorage.getItem<string>("accessToken");
}

export function setToken(token) {
  LocalStorage.setItem<string>("accessToken", token);
  // Viktor Token
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGMwMWNjYzEzMzk2OTRjNTcyMTYyZmI2NTVkY2IxYTY1ZWQwMmUzMjAiLCJpYXQiOjE2MzQ2MzYxOTR9.RssrVX1cDuEpKjrn90EQfh8mEAnkAvkgVmNs-1g5Tz8')
  // Token Edgar
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGU3MzZiNTAyY2IyYjQ3ZjNlN2YxZmEwZmJhMmUxM2IxYTVkNjhjMGEiLCJpYXQiOjE2MzM2NTEyNDd9.-4Sst6jdC7hsx9T9-hpJLj0bVlBtYWnLunXxdfqpsro')
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGQzNDZjNWRjYTg4ZmZlMWRlZTUzODhhYjU4YTIwNGRiNjYyYTc0MTEiLCJpYXQiOjE2MzUxNjE1Nzl9.ya5l6XIhJLQdKcZ_C9YmdLMRC673CFEwKlWzD2actig')
  // Token Dmitry
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGJjYjhlOWI2M2Q4ZGZkMDJjNzY0MmRkOTc2YjQ4MjljMzRmMTdlYzEiLCJpYXQiOjE2MzE4NjQ5MDZ9.Xvbh9jJa6BMFy5Wl6PskmarmpavVwQ16QMK6wc3lj_M')
  // Token Sergey
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGFjNzU4MTNjMGUwZGU0MDM2ODZlOTZiZGYyMDBlZDM2NzZiYzIwNWEiLCJpYXQiOjE2MzY5ODc1Mjh9.jOjOA2vAT6M5Q4qUBjqknpo1-Bn8sglni3sURn5KByM')
  // Token Olga
  // window.localStorage.setItem("accessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweGUwZGMxYzAyZjljZTE1MjRhMjc1NmJjYmU4NGM4MDZmYTcyZWYxOTkiLCJpYXQiOjE2MzcwNTg2OTR9.FmBQ3N3_sewRENxiUlJk0_PSk1JZH9s2GxTMO4oiVQc')
}

export function deleteToken() {
  LocalStorage.deleteItem("accessToken");
}

export const formatAccount = (account) => {
  let res = account;
  if (!res) return "";
  let n = res?.length;
  //0x4d8708bd9...5035
  return `${res?.slice(0, 12)}...${res.slice(n - 4)}`;
};

export function usePrevious<T>(value: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current as T;
}

export interface IFetchParams {
  url: string;
  body?: any;
  query?: any;
  mainUrl?: string;
  headers?: any;
}

export const fetchApi = (method: string, codeSuccess = "200", params: IFetchParams) => {
  const { url, body, query, mainUrl, headers } = params;
  const firstUrl = mainUrl ? mainUrl : baseUrl;

  const token = getToken();
  let headersFull = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  if (isFull(headers)) {
    headersFull = { ...headersFull, ...headers };
  }
  let config = {
    url: `${firstUrl}${url}`,
    method: method,
    headers: headersFull,
  } as any;

  if (query) {
    config.params = query;
  }
  if (body) {
    config.data = body;
  }
  return axios(config)
    .then((res) => {
      if (+res.status !== +codeSuccess && +res.status !== 200) {
        throwError({ status: res.status, message: res?.data?.message });
      }
      if (res.data.error) {
        throwError({ status: res.status, message: res?.data?.message });
      }
      return res.data as any;
    })
    .catch((error) => {
      if (error.response) {
        throwError({
          status: error.response.status,
          message: error.response?.data?.message || error?.response?.statusText || error.response?.data?.Error?.Message,
        });
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        throwError({ status: "", message: "no response" });
      } else if (error.status) {
        // todo: check for working correctly
        throwError({ status: error.status, message: error.message });
      } else {
        throwError({ status: "", message: error });
      }
    });
};

export const throwError = (error) => {
  const err = new Error(error.message) as any;
  err.status = error.status;
  throw err;
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export function isFull(elem: any) {
  if (typeof elem === "undefined") {
    return false;
  }
  if (typeof elem === "object") {
    const stringifiedElem = JSON.stringify(elem, getCircularReplacer());
    if (elem === null) return false;
    try {
      if (stringifiedElem === "{}") return false;
      if (stringifiedElem === "[]") return false;
      if (stringifiedElem === "undefined") return false;
    } catch (err) {}
    for (const key in elem) {
      if (isFull(elem[key])) {
        return true;
      }
    }
    return Object.keys(elem)?.length === 0 && stringifiedElem?.length > 0;
  }
  if (typeof elem === "string") {
    if (elem === "{}" || elem === "[]") return false;
    if (elem === "''" || elem === '""') return false;
    return elem.length > 0;
  }
  if (Array.isArray(elem)) {
    if (elem.length > 0) {
      for (let i = 0; i < elem.length; i++) {
        if (isFull(elem[i])) return true;
      }
      return false;
    }
    return false;
  }
  if (typeof elem === "boolean") {
    return elem;
  }
  if (typeof elem === "number") {
    return true;
  }
  return true;
}

export const arrayClone = (arr) => {
  let i, copy;
  if (Array.isArray(arr)) {
    copy = arr.slice(0);
    for (i = 0; i < copy.length; i++) {
      copy[i] = arrayClone(copy[i]);
    }
    return copy;
  } else if (typeof arr === "object") {
    let obj = {};
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        if (Array.isArray(arr[key]) || typeof arr[key] === "object") {
          obj = { ...obj, [key]: arrayClone(arr[key]) };
        } else {
          obj = { ...obj, [key]: arr[key] };
        }
      }
    }
    return obj;
  } else {
    return arr;
  }
};

export function capitalize(string = "") {
  return string.length > 1 ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

export function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const formBreadcrumbs = ({ initElem, pathFolder, nameBucket, file }) => {
  let result = [initElem];
  let elems = pathFolder.split("/");
  if (elems[elems.length - 1]?.length === 0) {
    elems.pop();
  }
  elems.unshift(nameBucket);

  const n = elems.length;

  let prev = initElem.path;
  for (let i = 0; i < n; i++) {
    const path = `${prev}/${elems[i]}`;
    let elem = elems[i];
    // const decoded = decodeURI(elem);
    //result.push({title: decodeURIComponent(elems[i]), path: path});
    result.push({ title: elem, path: path.replace("//", "/") });
    prev = path;
  }

  if (file) {
    result.push({ title: file });
  }
  return result;
};

export const downloadFileByLink = async (link, name) => {
  return new Promise((resolve) => {
    if (typeof document !== "undefined") {
      const linkElem = document.createElement("a");
      linkElem.setAttribute("href", link);
      linkElem.setAttribute("download", name);
      linkElem.setAttribute("_target", "_blank");
      linkElem.style.display = "none";
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
      resolve(true);
    } else {
      resolve(true);
    }
  });
};

/*export const downloadFilesByLinks = async (links)=>{
  return new Promise((resolve, reject)=>{
    if (typeof document !== "undefined") {
      let linksMas = [] as any;
      for (let i = 0; i < links.length; i++) {
        linksMas[i] = document.createElement('a');
        linksMas[i].setAttribute('_target', "_blank");
        linksMas[i].style.display = 'none';
        document.body.appendChild(linksMas[i]);
      }
      /!*const linkElem = document.createElement('a');

      linkElem.setAttribute('_target', "_blank");
      linkElem.style.display = 'none';
      document.body.appendChild(linkElem);*!/
      for (let i = 0; i < links.length; i++) {
        linksMas[i].setAttribute('href', links[i].link);
        linksMas[i].setAttribute('download', links[i].name);
      }
      for (let i = 0; i < links.length; i++) {
        linksMas[i].click();
      }
      /!*for (let i = 0; i < links.length; i++) {
        document.body.removeChild(linksMas[i]);
      }*!/
      resolve(true)
    }else{
      resolve(true)
    }
  })
}*/

export function downloadFiles(files) {
  function download_next(i) {
    if (i >= files.length) {
      return;
    }
    const a = document.createElement("a");
    a.href = files[i].link;
    a.target = "_parent";
    // Use a.download if available, it prevents plugins from opening.
    if ("download" in a) {
      a.download = files[i].name;
    } else {
      a.setAttribute("download", files[i].name);
    }
    // Add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
      a.click(); // The click method is supported by most browsers.
    }
    // Delete the temporary link.
    (document.body || document.documentElement).removeChild(a);
    // Download the next file with a small timeout. The timeout is necessary
    // for IE, which will otherwise only download the first file.
    setTimeout(function () {
      download_next(i + 1);
    }, 1000);
  }

  // Initiate the first download.
  download_next(0);
}

export function getQuery() {
  let match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  let urlParams = {};
  //eslint-disable-next-line
  while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}

export function formatBytes(a, b = 2) {
  try {
    if (0 === a) return "0 B";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return (
      parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
      " " +
      ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    );
  } catch (err) {
    console.error("catch formatBytes", err);
    return "0 B";
  }
}

export const initSocket = () => {
  const token = getToken() as string;
  return io(apiUrl, {
    path: "/socket.io",
    query: { token: token },
    forceNew: true,
    transports: ["websocket", "polling"],
  });
};

export function isBucketNameValid(bucketName: string): boolean {
  return (
    bucketName.length >= 3 &&
    bucketName.length <= 63 &&
    !!bucketName.match(/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/) &&
    !bucketName.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/)
  );
}

export function validateBucketName(bucketName: string): string {
  if (bucketName?.length === 0) {
    return "Fill the field";
  }
  if (!bucketName.match(/^[a-z0-9-]+$/)) {
    return "Bucket name can only contain lower case Latin letters (a-b), digits (0-9) and hyphens (-).";
  }
  if (bucketName[0] === "-" || bucketName?.[bucketName.length - 1] === "-") {
    return "Bucket name can't start or end with a hyphen.";
  }
  if (bucketName?.length < 3) {
    return "Bucket name must be 3 or more characters long.";
  }
  if (bucketName?.length > 63) {
    return "Bucket name must be less than 63 characters long.";
  }
  return "";
}

export function isFolderNameValid(nameFolder: string): boolean {
  return nameFolder.length >= 1 && nameFolder.length <= 63 && nameFolder.indexOf("/") <= -1;
}

export const validateFolderName = (nameFolder: string): string => {
  switch (true) {
    case nameFolder.length < 1: {
      return "Folder name must contain more than 1 character";
    }
    case nameFolder.indexOf("/") !== -1: {
      return "Folder can't contain slash (/) in its name.";
    }
    case nameFolder.length >= 63: {
      return "Maximum length of Folder name 63 characters";
    }
    default: {
      return "";
    }
  }
};

export function isWithdrawValid(withdraw: string, minimum: number = 25): boolean {
  return (
    withdraw.length >= 2 && withdraw.length <= 63 && Number(withdraw) >= minimum
    // &&
    // !!withdraw.match(/^[0-9][0-9.-]+[0-9]$/)
    // &&
    // !withdraw.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/)
  );
}

export function isMetadataKeyValid(metadataKey: string): boolean {
  return (
    metadataKey.length >= 1 &&
    metadataKey.length <= 63 &&
    !!metadataKey.match(/^[a-zA-Z0-9-]*$/) &&
    !metadataKey.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/)
  );
}

export const billingArrayTest = [
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:51:38.011Z",
  },
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:51:38.566Z",
  },
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:51:38.806Z",
  },
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:51:39.151Z",
  },
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:51:39.211Z",
  },
  {
    amount: "2",
    status: "SUCCESS",
    type: "FROM_ETH_TO_PARACHAIN",
    transactionFee: "0.000034767000278136",
    transactionFeeUnit: "Ether",
    date: "1970-01-19T19:56:02.188Z",
  },
];

export function uriEncode(input: string, encodeSlash = true): string {
  let result = "";

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (
      (ch.charCodeAt(0) >= "A".charCodeAt(0) && ch.charCodeAt(0) <= "Z".charCodeAt(0)) ||
      (ch.charCodeAt(0) >= "a".charCodeAt(0) && ch.charCodeAt(0) <= "z".charCodeAt(0)) ||
      (ch.charCodeAt(0) >= "0".charCodeAt(0) && ch.charCodeAt(0) <= "9".charCodeAt(0)) ||
      ch === "_" ||
      ch === "-" ||
      ch === "~" ||
      ch === "."
    ) {
      result += ch;
    } else if (ch === "/") {
      result += encodeSlash ? "%2F" : ch;
    } else {
      result +=
        ch.charCodeAt(0) > 255
          ? encodeURIComponent(ch)
          : "%" + ch.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase();
    }
  }

  return result;
}

export const removeEmpty = (data, field1, field2) => {
  if (!isFull(data)) {
    return data;
  }
  let index = -1;
  let i = 0;
  let result = [];
  while (i < data.length) {
    if (data[i]?.[field1].toString() !== "0" || (field2.length > 0 && data[i]?.[field2].toString() !== "0")) {
      index = i;
      break;
    }
    i++;
  }
  if (index >= 0) {
    result = data.slice(index);
  }
  return result;
};

export async function timeout(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function formatNumber(digits: number, num: number | string) {
  let val = (+num).toFixed(digits) as any;
  val = removeZeros(val);
  return val;
}

export function removeZeros(num: number | string): string {
  let value = num.toString();

  function removeZero(val: string): string {
    let idx = val.indexOf(".");
    if (idx < 0) {
      idx = val.indexOf(",");
    }
    if (idx > 0) {
      if ((val[0] === "0" && idx > 1) || val[val?.length - 1] === "0") {
        if (val[val?.length - 1] === "0") {
          val = val.substring(0, val.length - 1);
        }
        if (val[0] === "0" && idx > 1) {
          val = val.substring(1);
        }
        return removeZero(val);
      } else {
        if (val[val?.length - 1] === "." || val[val?.length - 1] === ",") {
          val = val.substring(0, val.length - 1);
        }
        return val;
      }
    } else {
      if (val[0] === "0" && val.length > 1) {
        val = val.substring(1);
        return removeZeros(val);
      } else {
        return val;
      }
    }
  }

  if (value?.toString() === "0") {
    return "0";
  }
  return removeZero(value);
}

const _time = {
  seconds: (n: number) => n * 1000,
  minutes: (n: number) => n * _time.seconds(60),
  hours: (n: number) => n * _time.minutes(60),
};

export const time = _time;

export function formatBalance(balance) {
  return (balance / 1000000000000000000).toFixed(2);
}

export const voidCallback = () => null as unknown as void;

export function hideWidthCounter(number, numeric) {
  let minusValue = number;
  for (let i = 1; i < (numeric + "").length; i++) {
    minusValue = minusValue + number;
  }
  return +minusValue;
}
