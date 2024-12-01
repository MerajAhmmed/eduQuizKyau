import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.tokens?.accessToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = auth?.tokens?.refreshToken;

          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/refresh-token`,
            { refreshToken }
          );

          const tokens = response?.data?.data;
          setAuth({ ...auth, tokens: { ...tokens } });
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);
  return { api };
};
