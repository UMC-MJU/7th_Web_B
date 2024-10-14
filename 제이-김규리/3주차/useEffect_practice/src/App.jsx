import {useState, useEffect} from 'react';

// Clean Up Practice
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("count 변경");
  }, [count])

  useEffect(() => {
    console.log("name 변경");
  }, [name])
  return(
    <>
      <div>
        <button onClick={() => setCount(count+1)}>+1</button>
        <span>{count}</span>
      </div>
      <div>
        <input onChange={(e) => setName(e.target.value)}></input>
        <span>{name}</span>
      </div>
    </>
  );
}

export default App
