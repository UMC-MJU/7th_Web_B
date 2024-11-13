// src/hooks/queries/useGetDetail.js
import axiosInstance from '../../apis/axios-instance';

const useGetDetail = async ({ movieId }) => {
    // 영화의 상세 정보 요청
    const { data: movieData } = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);

    // 영화의 출연진 정보 요청
    const { data: creditsData } = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`);

    // 영화와 출연진 정보를 반환
    return { movie: movieData, credits: creditsData };
};

export default useGetDetail;
