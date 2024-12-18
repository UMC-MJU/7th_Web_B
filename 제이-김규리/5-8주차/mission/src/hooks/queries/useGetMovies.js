import axiosInstance from '../../apis/axios-instance';

const useGetMovies = async ({category, pageParam}) => {
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}&include_adult=false`)
    // 속성 이름을 기준으로 구조분해할당 사용
    // data 속성만 뽑아옴
    return data;
}

export default useGetMovies