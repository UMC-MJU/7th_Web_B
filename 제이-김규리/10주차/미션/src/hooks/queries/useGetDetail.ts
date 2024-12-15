// src/hooks/queries/useGetDetail.ts
import axiosInstance from "../../apis/axios-instance";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  [key: string]: any;
}

interface Person {
  id: number;
  name: string;
  character?: string;
  job?: string;
  [key: string]: any;
}

interface Credits {
  cast: Person[];
  crew: Person[];
}

interface DetailResponse {
  movie: Movie;
  credits: Credits;
}

const useGetDetail = async ({ movieId }: { movieId: string }): Promise<DetailResponse> => {
  // 영화의 상세 정보 요청
  const { data: movieData } = await axiosInstance.get<Movie>(`/movie/${movieId}?language=ko-KR`);

  // 영화의 출연진 정보 요청
  const { data: creditsData } = await axiosInstance.get<Credits>(`/movie/${movieId}/credits?language=ko-KR`);

  // 영화와 출연진 정보를 반환
  return { movie: movieData, credits: creditsData };
};

export default useGetDetail;
