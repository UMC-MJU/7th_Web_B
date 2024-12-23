import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useGetRecommendation from "../../../hooks/queries/useGetRecommendation";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import SkeletonCard from "../../skeleton";

interface Movie {
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
  id: number;
  poster_path: string;
}

interface RecommendationResponse {
  related: {
    results: Movie[];
  };
}

const RelatedPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const MvId = movieId ? parseInt(movieId, 10) : 0;

  const { data, isLoading, isError, isFetching } = useQuery<RecommendationResponse, Error>({
    queryFn: () => useGetRecommendation(MvId),
    queryKey: ["movieRecommendation", movieId],
  });

  if (isLoading) {
    return (
      <MovieContainer>
        {[...Array(10)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </MovieContainer>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생</h1>
      </div>
    );
  }

  if (!data || !data.related?.results?.length) {
    return (
      <div>
        <h1 style={{ color: "white" }}>추천 콘텐츠를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  const { related } = data;

  return (
    <div>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          marginLeft: "13px",
          marginBottom: "0",
        }}
      >
        추천 콘텐츠
      </p>
      <MovieContainer>
        {related.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isFetching && (
          <MovieContainer>
            {[...Array(5)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </MovieContainer>
        )}
      </MovieContainer>
    </div>
  );
};

export default RelatedPage;
