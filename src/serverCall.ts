import axios from "axios";
import config from "./config";

const BASE_URL = config.baseApi;

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request: any) => {
  const user = sessionStorage.getItem("token");

  if (user) {
    const token = user;
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401 || response.status === 403 || response.status === 400) {
    sessionStorage.clear();
    // window.location.replace("/");
  }

  if (response.status === 500) {
    alert("Server is down")
  }

  return response;
};

const requestErrorHandler = (error: any) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error: any) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      sessionStorage.clear();
      // window.location.replace("/");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);

export default customAxios;