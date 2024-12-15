import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
import Search from "./pages/Search/search";
import Movies from "./pages/movies-page/movies";
import RootLayout from "./layout/root-layout";
import { createGlobalStyle } from "styled-components";
import UpComingPage from "./pages/movies-page/movies-category/up-coming";
import NowPlayingPage from "./pages/movies-page/movies-category/now-playing";
import PopularPage from "./pages/movies-page/movies-category/popular";
import TopRatedPage from "./pages/movies-page/movies-category/top-rated";
import TrendingPage from "./pages/movies-page/movies-category/trending";
import DetailPage from "./pages/movies-page/Detail/detail";
import ContentPage from "./pages/movies-page/Detail/content_info";
import RelatedPage from "./pages/movies-page/Detail/related_content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/up-coming",
        element: <UpComingPage />,
      },
      {
        path: "movies/now-playing",
        element: <NowPlayingPage />,
      },
      {
        path: "movies/popular",
        element: <PopularPage />,
      },
      {
        path: "movies/top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "movies/:movieId",
        element: <DetailPage />,
        children: [
          {
            path: "content_info",
            element: <ContentPage />,
          },
          {
            path: "related_content",
            element: <RelatedPage />,
          },
        ],
      },
      {
        path: "movies/trending",
        element: <TrendingPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
