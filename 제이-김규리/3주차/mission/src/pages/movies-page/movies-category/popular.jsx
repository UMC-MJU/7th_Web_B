import {useState, useEffect} from "react";
import axios from "axios";
import MovieContainer from "../../../components/custom-movie/movie-container";
import MovieCard from "../../../components/custom-movie/movie-card";

const PopularPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async() => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, {
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
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </MovieContainer>
    );
}

export default PopularPage;