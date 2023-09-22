import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";
import jwt_decode from "jwt-decode";
const token = localStorage.getItem("token");

let initialState = {
  isAuth: false,
  currentUser: null,
  tokenExt: 0,
};

console.log(token);

if (token) {
  let decodedToken = jwt_decode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    initialState = {
      isAuth: true,
      currentUser: {
        id: decodedToken.id,
        role: decodedToken.role,
        email: decodedToken.email,
        full_name: decodedToken.full_name,
        phone: decodedToken.phone,
      },
      tokenExt: decodedToken.exp,
    };
    console.log(initialState);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      const decoded = jwt_decode(action.payload.token);
      state.currentUser = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
        full_name: decoded.full_name,
        phone: decoded.phone,
      };
      state.isAuth = true;
      state.tokenExt = decoded.exp;
    },
    logout: (state) => {
      state.isAuth = false;
      state.currentUser = null;
      state.tokenExt = 0;
      localStorage.removeItem("token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { authorize, logout } = authSlice.actions;

export const sendVerificationEmail = (email) => (dispatch) => {
  axios.post(`${END_POINT}/api/auth/sendmail`, { email });
};

export const verifyCode = (email, code) => (dispatch) => {
  axios
    .post(`${END_POINT}/api/auth/verifycode`, { email, code })
    .then((res) => dispatch(authorize(res.data)));
};

export default authSlice.reducer;
