// utils/api.js
import axios from "axios";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

let access_token;
let refresh_token;
if (typeof window !== "undefined") {
  access_token = localStorage.getItem("access") || "";
  refresh_token = localStorage.getItem("refresh") || "";
}

// const API_URL = " http://localhost:8000/api";
const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  "Content-Type": "application/json",
  headers: {
    Authorization: access_token ? `Bearer ${access_token}` : "",
  },
});

api.interceptors.request.use(async (req) => {
  const router = useRouter();
  const accessToken = localStorage.getItem("access");
  if (!accessToken) return req; // Early return

  req.headers.Authorization = `Bearer ${accessToken}`;

  const user = jwtDecode(accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  try {
    const refreshTokenResponse = await axios.post(
      `${API_URL}/auth/token/refresh/`,
      {
        refresh: refresh_token,
      },
    );
    localStorage.setItem(
      "access",
      JSON.stringify(refreshTokenResponse.data.access),
    );
    req.headers.Authorization = `Bearer ${refreshTokenResponse.data.access}`;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // Handle error (e.g., redirect to login)
    router.push("/auth/login");
    toast.error("An error occured");
  }

  return req;
});

export default api;

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
