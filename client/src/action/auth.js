import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    // navigate to homepage
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sign up use
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    // naviaget home
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
