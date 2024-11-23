import React, {useState} from 'react'
import {useDispatch  } from 'react-redux'
import {add} from '../redux/todoSlice'

export default function InputTodo() {
    const dispatch = useDispatch()

    const [todolist, setTodolist] = useState(
    {
        id : 0,
        text : "",
    }
    );

    function handleText(e) {
        setTodolist({text : e.target.value})
    }

    function onReset () {
        setTodolist({text : ""})
    }
  
    
  return (
      <div >
        <form onSubmit={(e) => {
            e.preventDefault()
            if(todolist.text !== ""){dispatch(add(todolist.text))}
            else(alert("할 일을 입력해주세요!"))
            onReset()
            }}>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px'}}>
                    <input 
                        type="text"  
                        value = {todolist.text} 
                        onChange={handleText}
                        style={{borderRadius: '20px', width: '400px', height: '40px', boxSizing: 'border-box', marginRight: '50px', borderColor: 'blue', paddingLeft: '20px'}}
                    />
                    <input 
                        type="submit" 
                        value="+"
                        style={{borderRadius: '20px', width: '40px', boxSizing: 'border-box', backgroundColor: 'white', borderColor: 'blue'}}
                    />
                </div>
            </form>
      </div>

    )
}