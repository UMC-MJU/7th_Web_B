import { useState } from 'react'
import { MOVIES } from './mocks/movies';
import './App.css'

function App() {

  const movies = MOVIES.results;
  const handleMouseOver = (e) => {
    e.target.style.filter = 'brightness(0.6)';
  };
  const handleMouseOut = (e) => {
    e.target.style.filter = 'brightness(1)';
  };
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {movies.map((movie) => (
        <img 
          key={movie.id} 
          // w92 ~ w154
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          style={{
            margin: '5px', 
            borderRadius: '10px', 
            width: '9.3%'
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      ))}
    </div>
  );
}

export default App
