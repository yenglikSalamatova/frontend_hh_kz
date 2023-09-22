import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    resume: {},
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload;
    },
    setMyResume: (state, action) => {
      state.resume = action.payload;
    },
  },
});

export const { setMyResumes, setMyResume } = resumeSlice.actions;

export const getMyResumes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/resume`);
    dispatch(setMyResumes(response.data));
  } catch (error) {
    alert("Ошибка при загрузке резюме");
    console.log(error);
  }
};

export const createResume = (data, router) => async (dispatch) => {
  try {
    const response = await axios.post(`${END_POINT}/api/resume`, data);
    if (response.status === 200) {
      router.push(`/resumes`);
    }
  } catch (error) {
    alert("Ошибка при загрузке резюме");
    console.log(error);
  }
};

export const getResumeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/resume/${id}`);
    dispatch(setMyResume(response.data));
  } catch (error) {
    alert("Ошибка при загрузке резюме");
    console.log(error);
  }
};

export default resumeSlice.reducer;
