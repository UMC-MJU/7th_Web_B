// App.jsx
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/home";
import NotFound from "./components/not-found";
import Movies from "./components/MoviesPage";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage></HomePage>,
    element: <RootLayout />,
    errorElement: <NotFound></NotFound>,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "movies",
        element: <Movies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// 구조 요약
// Navbar: 각 버튼(링크) 클릭 시 이동할 URL을 지정. 이를 통해 사용자가 다른 페이지로 이동.

// Outlet: RootLayout에 포함되어 있어서, 현재 라우트의 자식 컴포넌트가 여기에 표시됨.
// 즉, RootLayout의 <Navbar />는 항상 표시되고, 자식 경로의 컴포넌트가 동적으로 <Outlet /> 위치에 렌더링됨.

// children의 path와 element 설정:

// children 배열에서 각각의 path와 element는 Navbar의 URL에 따른 동작할 컴포넌트를 지정.
