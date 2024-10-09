import {useState, useEffect} from "react";
import axios from "axios";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";
import MovieImage from "../../../components/custom-movie/movie-image";
import MovieTitle from "../../../components/custom-movie/movie-title";
import MovieDate from "../../../components/custom-movie/movie-date";

const TopRatedPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async() => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjEzNWM0ZTcxOGE0ZGZkNzY5ZDQyNmU4NzgyYzdkZSIsIm5iZiI6MTcyODQ2MDc5OS4xODg5NDIsInN1YiI6IjY3MDBlYWQ5YzlhMTBkNDZlYTdjZmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3Ahq2PqWhv0O3uaxzQZcsvWRjFVHXJom63Q1qlhufk`,
                }
            })
            setMovies(movies);
        }
        getMovies();
    }, []);

    return(
        <MovieContainer>
            {movies.data?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie}>
                    <MovieImage 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                    />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieDate>{movie.release_date}</MovieDate>
                </MovieCard>
            ))}
        </MovieContainer>
    );
}

export default TopRatedPage;