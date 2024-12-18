import { axiosInstance } from "../../apis/axios-instance";

type particularMv = {
  backdrop_path: string,
  title: string,
  vote_averate:number,
  release_date: string,
  runtime:number,
  tagline: string,
  overview: string
}

type MvId = number;

const useGetParticularMV = async ( movieId : MvId) : Promise<particularMv> => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko`);
  return data;
};

export { useGetParticularMV };
