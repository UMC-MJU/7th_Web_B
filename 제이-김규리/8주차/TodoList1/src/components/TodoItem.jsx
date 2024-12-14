import { useState } from "react";
import {
  TodoItemContainer,
  Checkbox,
  TodoContent,
  ActionButton,
  EditInput,
  ConfirmButton,
} from "../styles";

const TodoItem = ({ todo, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    onUpdate(todo.id, editTitle, editContent);
    setIsEditing(false);
  };

  return (
    <TodoItemContainer className={isEditing ? "editing" : ""}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todo.id)}
        />
        {!isEditing ? (
          <TodoContent>
            <p>{todo.title}</p>
            <p>{todo.content}</p>
          </TodoContent>
        ) : (
          <div style={{ flex: 1 }}>
            <EditInput
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <EditInput
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
        )}
      </div>
      <div>
        {!isEditing ? (
          <>
            <ActionButton onClick={handleEdit}>수정</ActionButton>
            <ActionButton onClick={() => onDelete(todo.id)}>삭제</ActionButton>
          </>
        ) : (
          <ConfirmButton onClick={handleConfirm}>수정완료</ConfirmButton>
        )}
      </div>
    </TodoItemContainer>
  );
};

export default TodoItem;
