import axiosInstance from "../api/axiosInstance";

// 새 게시물 submit
export const addTodo = async (title, content) => {
  const newTodo = {
    title: title,
    content: content,
  };
  try {
    const response = await axiosInstance.post("", newTodo);
    console.log("Response:", response); // 응답 출력

    if (response.status === 201) {
      console.log("Todo added successfully:");
      return response.data;
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// 삭제 함수
export const deleteTodos = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  console.log(response);
  return response.data;
};

// 삭제 함수(상세 페이지)
export const deletePartPage = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  console.log(response);
  // navigate("/"); // TodoList로 복귀
};

// 수정 함수 (title,content만)
export const editTodos = async (id, title, content) => {
  const response = await axiosInstance.patch(`/${id}`, {
    title: title,
    content: content,
  });
  console.log("수정 요청", response); // 여기서 response를 출력해서 실제 요청을 확인
  return response.data;
};

// 상세페이지 수정 함수(title,content,checked 같이)
export const editPartTodos = async (
  id,
  editTitle,
  editContent,
  editChecked
) => {
  const response = await axiosInstance.patch(`/${id}`, {
    title: editTitle,
    content: editContent,
    checked: editChecked,
  });
  return response.data;
  // setEditId("");
  // refetch();
};

// 체크박스 수정 함수
export const editCheckbox = async (id, checkState) => {
  const response = await axiosInstance.patch(`/${id}`, {
    checked: !checkState,
  });
  console.log("체크 상태 변경 완료");
  return response.data;
  // getTodo();
};
