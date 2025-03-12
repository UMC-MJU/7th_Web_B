import axiosInstance from '../../apis/axios-instance';

const useGetMovies = async ({category, pageParam}) => {
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}&include_adult=false`)
    return data;
}

export default useGetMovies