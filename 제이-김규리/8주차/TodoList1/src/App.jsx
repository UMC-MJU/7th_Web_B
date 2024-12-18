import {
  AppContainer,
  Header,
  InputContainer,
  Input,
  SubmitButton,
  TodoList,
  TodoItemContainer,
  TodoContent,
  Checkbox,
  ActionButton,
} from "./styles";

function App() {
  // 기존 상태 및 핸들러 코드

  return (
    <AppContainer>
      <Header>ToDoList</Header>
      <InputContainer>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <form onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            name="content"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit" disabled={isLoading}>
            ToDo 생성
          </SubmitButton>
        </form>
      </InputContainer>
      <TodoList>
        {isLoading ? (
          <div>로딩중입니다...</div>
        ) : isError ? (
          <div>에러가 발생했습니다. 다시 시도해주세요.</div>
        ) : (
          todos?.map((todo) => (
            <TodoItemContainer key={todo.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  type="checkbox"
                  defaultChecked={todo.checked}
                  onChange={(e) => handlePatch(todo.id, e.target.checked)}
                />
                <TodoContent>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </TodoContent>
              </div>
              <div>
                <ActionButton onClick={() => handleUpdate(todo.id)}>
                  수정
                </ActionButton>
                <ActionButton onClick={() => handleDelete(todo.id)}>
                  삭제
                </ActionButton>
              </div>
            </TodoItemContainer>
          ))
        )}
      </TodoList>
    </AppContainer>
  );
}

export default App;
