// utils/api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

let access_token;
let refresh_token;
if (typeof window !== "undefined") {
  access_token = localStorage.getItem("access") || "";
  refresh_token = localStorage.getItem("refresh") || "";
}

// const API_URL = " http://localhost:8000/api";
const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  "Content-Type": "application/json",
  headers: {
    Authorization: access_token ? `Bearer ${access_token}` : "",
  },
});

api.interceptors.request.use(async (req) => {
  // if (access_token) {
  //   req.headers.Authorization = access_token ? `Bearer ${access_token}` : "";
  //   const user = jwtDecode(access_token);
  //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  //   if (!isExpired) return req;

  //   const res = await axios.post(`${API_URL}/token/refresh/`, {
  //     refresh: refresh_token,
  //   });

  //   if (res.status === 200) {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("access", res.data.access);
  //     }
  //     req.headers.Authorization = `Bearer ${res.data.access}`;
  //     return req;
  //   } else {
  //     const res = await axios.post(`${API_URL}/logout/`, {
  //       refresh: refresh_token,
  //     });
  //     if (res.status === 200) {
  //       if (typeof window !== "undefined") {
  //         localStorage.removeItem("access");
  //         localStorage.removeItem("refresh");
  //         localStorage.removeItem("user");
  //       }
  //     }
  //   }
  // }
  // return req;

  if (access_token) {
    //  accessToken=localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    req.headers.Authorization = localStorage.getItem("access")
      ? `Bearer ${access_token}`
      : "";
    const user = jwtDecode(access_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;
    const resp = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refresh_token,
    });
    localStorage.setItem("access", JSON.stringify(resp.data.access));
    req.headers.Authorization = `Bearer ${resp.data.access}`;
    return req;
  } else {
    req.headers.Authorization = localStorage.getItem("access")
      ? `Bearer ${localStorage.getItem("access")}`
      : " ";
    return req;
  }
});

export default api;
