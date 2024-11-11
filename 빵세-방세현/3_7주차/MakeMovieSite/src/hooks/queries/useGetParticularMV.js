import { axiosInstance } from "../../apis/axios-instance";

const useGetParticularMV = async ({ movieId }) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko`);
  return data;
};

export { useGetParticularMV };
