// src/hooks/queries/useGetRecommendation.ts
import axiosInstance from "../../apis/axios-instance";

interface RecommendationResponse {
  related: {
    results: Array<{
      id: number;
      title: string;
      [key: string]: any;
    }>;
  };
}

const useGetRecommendation = async ({
  movieId,
}: {
  movieId: string;
}): Promise<RecommendationResponse> => {
  const { data: relatedData } = await axiosInstance.get(`/movie/${movieId}/recommendations?language=ko-KR&page=1`);

  return { related: relatedData };
};

export default useGetRecommendation;
