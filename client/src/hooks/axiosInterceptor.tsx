import axios from "axios";

const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  axios.interceptors.request.use(
    (config) => {
      config.baseURL = "http://localhost:3001/api";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return children;
};

export { AxiosInterceptor };

