import axios from "axios";
let BASE_URL;

if (typeof window !== 'undefined') {
  BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  // BASE_URL = `http://localhost:5000/api`;
}

export const outsideAuthAxiosInstance = axios.create({
  // baseURL: process.env.NEXT_DEV_API_URL,
  baseURL: BASE_URL || "",
  timeout: 5000,
  // headers: { "X-Custom-Header": "foobar" },
});

export const api = axios.create({
  // baseURL: process.env.NEXT_DEV_API_URL,
  baseURL: BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});
