import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from "./userSlice";

// LOGIN
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

// REGISTER
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

// GET ALL USER
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

// DELETE USER
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};
