import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN as string}`,
  },
  baseURL: import.meta.env.VITE_MOVIE_API_URL as string,
});

export default axiosInstance;
