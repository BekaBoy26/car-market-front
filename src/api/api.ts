import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const contactApi = axios.create({
  baseURL: API_URL,
});

export const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
});

export const carsApi = axios.create({
  baseURL: `${API_URL}/cars`,
});

carsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const favoritesApi = axios.create({
  baseURL: `${API_URL}/favorites`,
});

favoritesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const profileApi = axios.create({
  baseURL: `${API_URL}/profile`,
});

profileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const brandsApi = axios.create({
  baseURL: `${API_URL}/brands`,
});

brandsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
