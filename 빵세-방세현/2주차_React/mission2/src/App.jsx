import { useState } from "react";
import "./App.css";
import { MOVIES } from "./mocks/movies";

function App() {
  return (
    <div>
      {MOVIES.results.map((results) => {
        return (
          <img
            className="eachPoster"
            src={`https://image.tmdb.org/t/p/w200/${results.poster_path}`}
          ></img>
        );
      })}
    </div>
  );
}

export default App;
