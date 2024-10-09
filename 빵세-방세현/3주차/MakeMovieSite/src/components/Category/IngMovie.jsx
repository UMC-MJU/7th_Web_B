import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";

const IngMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 처음 렌더링 시 데이터를 우선적으로 받아옴
    const getIngMovie = async () => {
      const IngMovies = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2I1MzcwYmRmYmE4NGVhMDIyMWYwYmRhZTU3NjJhYSIsIm5iZiI6MTcyODM2NTIyOC43NzIzMDUsInN1YiI6IjY3MDBmZGUyMTU5MmVmMWJhOTg1NDdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ikkrqAItlwWIkznFVb7QjERoKQwoLvyYhP7mP4PyKEo`,
          },
        }
      );
      console.log(IngMovies);
      setMovies(IngMovies);
    };
    getIngMovie();
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

export default IngMovie;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;
