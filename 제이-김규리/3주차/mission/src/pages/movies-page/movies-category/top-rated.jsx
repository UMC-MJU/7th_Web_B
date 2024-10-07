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
            const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjEzNWM0ZTcxOGE0ZGZkNzY5ZDQyNmU4NzgyYzdkZSIsIm5iZiI6MTcyODI2NzM3OC44ODQyMDgsInN1YiI6IjY3MDBlYWQ5YzlhMTBkNDZlYTdjZmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4iLIjgwDY9cLB1vbdBFpQrx9RtGBA3R87KJbQJ1gh64`,
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