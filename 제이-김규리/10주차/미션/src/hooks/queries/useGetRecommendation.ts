// src/hooks/queries/useGetRecommendation.ts
import axiosInstance from "../../apis/axios-instance";

interface RecommendationResponse {
  related: {
    results: Array<{
      title: string;
      backdrop_path: string;
      vote_average: number;
      release_date: string;
      runtime: number;
      tagline: string;
      overview: string;
      id: number;
      poster_path: string;
    }>;
  };
}

type MvId = number;

const useGetRecommendation = async (movieId: MvId): Promise<RecommendationResponse> => {
  const { data: relatedData } = await axiosInstance.get(`/movie/${movieId}/recommendations?language=ko-KR&page=1`);

  return { related: relatedData };
};

export default useGetRecommendation;
