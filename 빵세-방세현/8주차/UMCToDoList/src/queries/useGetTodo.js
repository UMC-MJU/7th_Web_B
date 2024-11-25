import axiosInstance from "../api/axiosInstance";

const useGetTodo = async (searchText = "") => {
  // 빈 문자열을 기본값으로
  const { data, status } = await axiosInstance.get("", {
    params: { title: searchText }, // searchText를 title 파라미터로 전달
  });

  if (status === 200) {
    return data[0]; // 데이터 반환
  } else {
    throw new Error("Failed to fetch todos");
  }
};

export { useGetTodo };
