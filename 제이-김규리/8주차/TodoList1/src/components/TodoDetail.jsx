import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import axiosInstance from '../apis/axiosInstance';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading, isError } = useFetch(`/todo/${id}`);

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch(`/todo/${id}`, {
        title: editTitle || todo.title,
        content: editContent || todo.content,
      });
      alert('수정이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('수정 중 문제가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      alert('삭제가 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('삭제 중 문제가 발생했습니다.');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div>
      <h1>상세보기</h1>
      <div>
        <p>제목: {todo.title}</p>
        <p>내용: {todo.content}</p>
        <p>완료 여부: {todo.checked ? '완료' : '미완료'}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="새 제목"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="새 내용"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <button onClick={handleUpdate}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default TodoDetail;
