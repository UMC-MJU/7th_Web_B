import { useState, useEffect } from "react";
import axios from "axios";

// import { MOVIES } from "../mocks/movies.js";
import Card from "./Card.jsx";

import * as S from "./movies.style.js";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2I1MzcwYmRmYmE4NGVhMDIyMWYwYmRhZTU3NjJhYSIsIm5iZiI6MTcyODEyNDI0Mi43MjQ5NzIsInN1YiI6IjY3MDBmZGUyMTU5MmVmMWJhOTg1NDdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4aQASHr3v23FPAHJAWHxTM2BSjCBWnZrViuWVDwt3bM`,
          },
        }
      );
      setMovies(movies);
    };
    getMovies();
    console.log(movies);
  }, []);

  return (
    <S.CardList>
      {movies.data?.results.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </S.CardList>
  );
};

export default MoviesPage;
