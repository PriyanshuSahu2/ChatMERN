import axios from "axios";

// export const BASE_URL = "https://markethub-backend.onrender.com/api";
export const BASE_URL = "http://localhost:5000/api";
export const USER_ID = localStorage.getItem("id");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    // const currentUser = user && JSON.parse(user).currentUser;
    // const TOKEN = currentUser?.accessToken;
    const TOKEN = localStorage.getItem("token");
    config.headers["authorization"] = `Bearer ${TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
