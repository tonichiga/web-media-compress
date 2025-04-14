import axios from "axios";

export const axiosForPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true,
});

export const axiosForNextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const axiosForPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true,
});

export default axiosForPrivate;
