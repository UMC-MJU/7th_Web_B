import { axiosInstance } from "../../apis/axios-instance";

const useGetCreditMV = async ({ movieId }) => {
  const { data } = await axiosInstance.get(
    `movie/${movieId}/credits?language=ko`
  );
  return data;
};

export { useGetCreditMV };
