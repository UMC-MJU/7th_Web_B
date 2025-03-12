import axios from 'axios';

// baseURL과 Authorization 헤더를 미리 설정
// get요청으로 뒤에 상대경로를 받아옴
const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    }, 
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
})

export default axiosInstance;