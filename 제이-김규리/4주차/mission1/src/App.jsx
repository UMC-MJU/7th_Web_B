import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import LoginPage from "./pages/login.jsx";
import SignUpPage from "./pages/sign-up.jsx";
import Search from "./pages/search.jsx";
import Movies from "./pages/movies-page/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import styled, {createGlobalStyle} from "styled-components";
import UpComingPage from "./pages/movies-page/movies-category/up-coming.jsx";
import NowPlayingPage from "./pages/movies-page/movies-category/now-playing.jsx";
import PopularPage from "./pages/movies-page/movies-category/popular.jsx";
import TopRatedPage from "./pages/movies-page/movies-category/top-rated.jsx";


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
        element: <Movies/>,
      },
      {
        path: 'movies/up-coming',
        element: <UpComingPage/>
      },
      {
        path: 'movies/now-playing',
        element: <NowPlayingPage/>
      },
      {
        path: 'movies/popular',
        element: <PopularPage/>
      },
      {
        path: 'movies/top-rated',
        element: <TopRatedPage/>
      },
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