import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
    cities: [],
    experiences: [],
    skills: [],
    employmentTypes: [],
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload;
    },
    setMyVacancy: (state, action) => {
      state.vacancy = action.payload;
    },
    handleDeleteVacancy: (state, action) => {
      const newVacancies = state.vacancies.filter(
        (item) => item.id !== action.payload
      );
      state.vacancies = newVacancies;
    },
    setSpecializations: (state, action) => {
      state.specializations = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setExperiences: (state, action) => {
      state.experiences = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setEmploymentTypes: (state, action) => {
      state.employmentTypes = action.payload;
    },
  },
});

export const {
  setMyVacancies,
  setMyVacancy,
  handleDeleteVacancy,
  setSpecializations,
  setCities,
  setExperiences,
  setSkills,
  setEmploymentTypes,
} = vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/vacancy`);
    dispatch(setMyVacancies(response.data));
  } catch (error) {
    alert("Ошибка при загрузке резюме");
    console.log(error);
  }
};

export const getEmploymentTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/employment-types`);
    dispatch(setEmploymentTypes(response.data));
  } catch (error) {
    alert("Ошибка при загрузке типов работы");
    console.log(error);
  }
};

export const getSkills = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/skills`);
    dispatch(setSkills(response.data));
  } catch (error) {
    alert("Ошибка при загрузке навыков");
    console.log(error);
  }
};

export const getSpecializations = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/specializations`);
    dispatch(setSpecializations(response.data));
  } catch (error) {
    alert("Ошибка при загрузке специализаций");
    console.log(error);
  }
};

export const getExps = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/api/experiences`);
    dispatch(setExperiences(response.data));
  } catch (error) {
    alert("Ошибка при загрузке опыта работы");
    console.log(error);
  }
};

export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/region/cities`);
    dispatch(setCities(res.data));
  } catch (error) {
    alert("Ошибка при загрузке городов");
    console.log(error);
  }
};

export const createVacancy = (data, router) => async (dispatch) => {
  try {
    const response = await axios.post(`${END_POINT}/api/vacancy`, data);
    if (response.status === 200) {
      router.push(`/vacancy`);
    }
  } catch (error) {
    alert("Ошибка при загрузке резюме");
    console.log(error);
  }
};

// export const getVacancyById = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${END_POINT}/api/resume/${id}`);
//     dispatch(setMyResume(response.data));
//   } catch (error) {
//     alert("Ошибка при загрузке резюме");
//     console.log(error);
//   }
// };

// export const editVacancy = (data, router) => async (dispatch) => {
//   try {
//     const res = await axios.put(`${END_POINT}/api/resume/`, data);
//     if (res.status === 200) {
//       router.push(`/resumes/${data.id}`);
//     }
//   } catch (error) {
//     alert("Ошибка при редактировании резюме");
//     console.log(error);
//   }
// };

export const deleteVacancy = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`);
    dispatch(handleDeleteVacancy(id));
  } catch (error) {
    alert("Ошибка при удалении вакансии");
    console.log(error);
  }
};

export default vacancySlice.reducer;
