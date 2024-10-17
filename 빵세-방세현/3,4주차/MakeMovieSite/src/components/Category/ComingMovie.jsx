import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./FrameComponent/Card";
import MovieList from "./FrameComponent/MovieList";
const ComingMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const getComingMovie = async () => {
      const comingMovies = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2I1MzcwYmRmYmE4NGVhMDIyMWYwYmRhZTU3NjJhYSIsIm5iZiI6MTcyODQ1OTc3NC4yMTczNzYsInN1YiI6IjY3MDBmZGUyMTU5MmVmMWJhOTg1NDdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g4yRsijE8DsrKkeJnk60G5cwyx-6pujHQW4sOO9lUJY`,
          },
        }
      );
      setMovies(comingMovies);
    };
    getComingMovie();
  }, []);

  {
    movies.data?.results.map((movie) => {
      // 컴포넌트에 데이터 전달
      <Card key={movie.id} movie={movie} />;
    });
  }

  return (
    <MovieList>
      {movies.data?.results.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
      })}
    </MovieList>
  );
};

export default ComingMovie;
