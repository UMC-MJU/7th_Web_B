import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import LoginPage from "./pages/login.jsx";
import SignUpPage from "./pages/sign-up.jsx";
import Search from "./pages/Search/search.jsx";
import Movies from "./pages/movies-page/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import styled, {createGlobalStyle} from "styled-components";
import UpComingPage from "./pages/movies-page/movies-category/up-coming.jsx";
import NowPlayingPage from "./pages/movies-page/movies-category/now-playing.jsx";
import PopularPage from "./pages/movies-page/movies-category/popular.jsx";
import TopRatedPage from "./pages/movies-page/movies-category/top-rated.jsx";
import DetailPage from "./pages/movies-page/detail.jsx";
import {useQuery, useQueryClient, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

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
      {
        // :movieId는 동적으로 변경될 수 있는 경로 변수
        path: 'movies/:movieId',
        element: <DetailPage/>
      },
    ]
  }
])
const queryClient = new QueryClient();


const GlobalStyle = createGlobalStyle`
  body{
    background-color: black;
  }
`;


function App(){
  return (
    <>
      <GlobalStyle/>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
 
    </>
  );
}

export default App;