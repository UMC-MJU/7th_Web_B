import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import styled from "styled-components";
import { postTodo, getTodoList, deleteTodo, patchTodo } from './apis/todo';
import { queryClient } from './main';
import BeatLoader from "react-spinners/BeatLoader.js";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");

  const {data: todos, isPending} = useQuery({
    queryFn: () => getTodoList({title: search}),
    queryKey: ["todos", search],
  });

  const {mutate: postTodoMutation} = useMutation({
    mutationFn: postTodo,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("항상 실행됨");
    }
  })

  const {mutate: deleteTodoMutation} = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    }
  })

  const {mutate: patchTodoMutation} = useMutation({
    mutationFn: patchTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    postTodoMutation({title, content});
    setTitle("");
    setContent("");
  }

 

  return (
    <Container>
        <SearchTxt>ToDoList</SearchTxt>
      <Form onSubmit={handleSubmit}>
        <Input 
          name="title" 
          placeholder='제목을 입력해주세요.'
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input 
          name="content" 
          placeholder='내용을 입력해주세요.'
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
        <AddButton type="submit">투두 생성</AddButton>
      </Form>
      {isPending ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
          <BeatLoader color={'black'}/>
        </div>
      ) : (
        todos[0]?.map((todo) => {
          return (
            <Todos key={todo.id}>
              <input 
                type='checkbox' 
                defaultChecked={todo.checked} 
                onChange={(e) => 
                  patchTodoMutation({id: todo.id, checked: !todo.checked})
                }
              />
              <TxtBox>
                {editId === todo.id ? (
                  <> 
                    <EditInput 
                      defaultValue={todo.title} 
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <EditInput 
                      defaultValue={todo.content}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                  </>
                )}
              </TxtBox>
              {editId !== todo.id ? (
                <>
                <Button style={{right: '83px'}} onClick={() => setEditId(todo.id)}>수정</Button>
                <Button onClick={() => deleteTodoMutation({id: todo.id})}>삭제</Button>
                </>
              ): (
                <Button 
                  onClick={() => {
                    patchTodoMutation({
                      id: editId,
                      title: editTitle,
                      content: editContent,
                  }); setEditId(""); }}
                >수정완료</Button>
              )}
              
            
            </Todos>
          );
        })
      )}
      
    </Container>
  )
}

export default App

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

const AddButton = styled.button`
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: grey;
`;

const SearchTxt = styled.p`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  padding: 80px;
  width: 600px;
  margin: 0 auto;
`;
const Todos = styled.div`
  display: flex;
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
  margin-top: 15px;
`;
const TxtBox = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  position: absolute;
  right: 10px;
  width: 67px;
  height: 28px;
  border: none;
  border-radius: 5px;
  margin-top: 8px;
`;

const EditInput = styled.input`
  width: 150px;
`;

