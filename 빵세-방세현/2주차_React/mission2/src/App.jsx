import { useState } from "react";
import "./App.css";
import { MOVIES } from "./mocks/movies";

function App() {
  const [choosePoster, setChoosePoster] = useState(null);

  const makeImageBlack = (id) => {
    setChoosePoster(id);
  };
  const resetImage = () => {
    setChoosePoster(null);
  };

  return (
    <div>
      {MOVIES.results.map((results) => {
        return (
          <img
            key={results.id}
            onMouseOver={() => makeImageBlack(results.id)} // 인자가 필요하므로 익명 함수 사용
            onMouseOut={resetImage} // 인자를 받지 않으므로 함수 참조를 직접 넘겨도 이벤트 발생시에만 호출됨.
            className={
              choosePoster === results.id ? "choosePoster" : "eachPoster"
            }
            src={`https://image.tmdb.org/t/p/w200/${results.poster_path}`}
            alt="영화 포스터"
          ></img>
        );
      })}
    </div>
  );
}

export default App;
