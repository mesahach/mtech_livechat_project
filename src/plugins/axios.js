import axios from 'axios';

const apiURL = `https://spotlightbackend.mtechsciverse.com`;
// const apiURL = `https://mainbackend.mtechsciverse.com`;

export const axiosv0 = axios.create({
    baseURL: `${apiURL}/v2/`,
    headers: {
      "X-Request-Origin": window.location.origin,
    },
    withCredentials: true,
});


// export const axiosv1 = axios.create({
//   baseURL: `${apiURL}/v1`,
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("userToken"),
//     "X-Request-Origin": window.location.origin,
//   },
//   withCredentials: true,
// });
export const axiosv1 = axios.create({
  baseURL: `${apiURL}/v1`,
  withCredentials: true,
});

// Add a request interceptor
axiosv1.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  config.headers["X-Request-Origin"] = window.location.origin;
  return config;
});


export const axiosv2 = axios.create({
  baseURL: `${apiURL}/`,
});