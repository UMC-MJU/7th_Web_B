import axiosInstance from "../api/axiosInstance";
const useGetParticularTodo = async (id) => {
  // 빈 문자열을 기본값으로
  const { data, status } = await axiosInstance.get(`/${id}`);

  if (status === 200) {
    console.log("상세 페이지 불러오기 성공");
    // console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch todos");
  }
};

export { useGetParticularTodo };
