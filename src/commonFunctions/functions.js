import axios from "axios";

export const setDefaultHeaders = () => {
  axios.defaults.headers.common["access-token"] = localStorage.getItem(
    "access-token"
  );
  axios.defaults.headers.common["token-type"] = localStorage.getItem(
    "token-type"
  );
  axios.defaults.headers.common["client"] = localStorage.getItem("client");
  axios.defaults.headers.common["expiry"] = localStorage.getItem("expiry");
  axios.defaults.headers.common["uid"] = localStorage.getItem("uid");
};

export const removeHeaders = () => {
  delete axios.defaults.headers.common["access-token"];
  delete axios.defaults.headers.common["token-type"];
  delete axios.defaults.headers.common["client"];
  delete axios.defaults.headers.common["expiry"];
  delete axios.defaults.headers.common["uid"];
};

export function saveHeaders(headers) {
  console.log(headers['access-token']);
  if (headers["access-token"]) {
    localStorage.setItem("access-token", headers["access-token"]);
  }
  console.log(localStorage.getItem('access-token'));
  if (headers["expiry"]) {
    localStorage.setItem("expiry", headers["expiry"]);
  }
  localStorage.setItem("token-type", headers["token-type"]);
  localStorage.setItem("client", headers["client"]);
  localStorage.setItem("uid", headers["uid"]);
  setDefaultHeaders();
}

export const saveCurrentUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
