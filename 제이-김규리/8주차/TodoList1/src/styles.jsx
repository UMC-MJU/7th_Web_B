import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: "⚡";
    margin: 0 10px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e5e5e5;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export const TodoList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

export const TodoContent = styled.div`
  text-align: left;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const ActionButton = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  font-size: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e5e5e5;
  }
`;
export const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 5px;
  outline: none;

  &:focus {
    border-color: #0056b3;
  }
`;

export const ConfirmButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
