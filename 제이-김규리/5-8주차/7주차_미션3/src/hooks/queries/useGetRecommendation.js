// src/hooks/queries/useGetDetail.js
import axiosInstance from '../../apis/axios-instance';

const useGetRecommendation = async ({ movieId }) => {

    // 영화의 출연진 정보 요청
    const { data: relatedData } = await axiosInstance.get(`/movie/${movieId}/recommendations?language=ko-KR&page=1`);

    // 영화와 출연진 정보를 반환
    return { related: relatedData};
};

export default useGetRecommendation;
