import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Home";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import FindPage from "./components/FindPage";
import MoviePage from "./components/MoviePage";
import Ex from "./components/Ex";
import IngMovie from "./components/Category/IngMovie";
import PopularMovie from "./components/Category/PopularMovie";
import GoodMovie from "./components/Category/GoodMovie";
import ComingMovie from "./components/Category/ComingMovie";
import RootLayout from "./layout/root-layout";
import NotFound from "./components/NotFound";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "login",
        element: <LogInPage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "signup",
        element: <SignUpPage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "find",
        element: <FindPage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "movie",
        element: <MoviePage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: "ex",
        element: <Ex />,
      },
      {
        path: "movie/now-playing",
        element: <IngMovie />,
      },
      {
        path: "movie/popular",
        element: <PopularMovie />,
      },
      {
        path: "movie/top-rated",
        element: <GoodMovie />,
      },
      {
        path: "movie/up-coming",
        element: <ComingMovie />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
