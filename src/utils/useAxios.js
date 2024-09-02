import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "https://avi8654340.pythonanywhere.com/";

const useAxios = () => {
  const { authTokens, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async (req) => {
    // Check if token is expired
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      // Token is expired, refresh it
      const response = await axios.post(`${baseURL}api/token/refresh/`, {
        refresh: authTokens.refresh
      });

      // Update tokens and headers
      setAuthTokens(response.data);
      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      // If refresh token also expired, log out user
      console.error("Error refreshing token:", error);
      setAuthTokens(null);
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;