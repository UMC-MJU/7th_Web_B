import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
import Search from "./pages/search.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout";
import styled, {createGlobalStyle} from "styled-components";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    // Outlet에 들어가는 요소들 ??
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'login',
        element: <LoginPage/>
      }, 
      {
        path: 'sign-up',
        element: <SignUpPage/>
      }, 
      {
        // 경로가 path면 element요소를 보여줌
        path: 'search',
        element: <Search/>
      },
      {
        path: 'movies',
        element: <Movies/>
      }
    ]
  }
])
const GlobalStyle = createGlobalStyle`
  body{
    background-color: black;
  }
`;
function App(){
  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;