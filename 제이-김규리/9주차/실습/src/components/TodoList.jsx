import React from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { remove , complete } from '../redux/todoSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function TodoList() {
    const todolist = useSelector(state => state.todo)
    const dispatch = useDispatch()

    console.log(todolist);
    const trash = <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: '20px', color: 'grey' }}/>

    const todolistView = todolist.map((todo, idx) => (
        
        <li key={todolist[idx].id} style={{listStyleType: 'none', display: 'flex', margin: '20px', width: '400px', position: 'relative', alignItems: 'center'}}>
            <input 
                type="checkbox" 
                onChange={()=> dispatch(complete(todolist[idx].id))}
            />
            <div style={{marginLeft: '30px'}}>{todo.complete === false ? <p style={{fontSize: '20px'}}>{todo.text}</p> : <del>{todo.text}</del>}</div>
            <button 
                type="button" 
                onClick={() => dispatch(remove(todolist[idx].id))}
                style={{position: 'absolute', right: '5px', border: 'none', backgroundColor: 'white'}}
            >{trash}</button>
        </li> 
    ))


  return (
      <>
        {todolistView}
      </>
  )
}