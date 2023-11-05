import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { loginSuccess } from "./redux/authSlice.js";

const refreshToken = async () => {
  try {
    const { data } = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return data.accessToken;
  } catch (err) {
    console.error(err);
    // Add your error handling logic here
  }
};

const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentEpochTimeInSeconds = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentEpochTimeInSeconds;
};

export const createAxios = (user, dispatch) => {
  const instance = axios.create();

  instance.interceptors.request.use(
    async (config) => {
      if (isTokenExpired(user?.accessToken)) {
        const newAccessToken = await refreshToken();
        const updatedUser = { ...user, accessToken: newAccessToken };

        dispatch(loginSuccess(updatedUser));
        return {
          ...config,
          headers: { ...config.headers, token: "Bearer " + newAccessToken },
        };
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  return instance;
};
