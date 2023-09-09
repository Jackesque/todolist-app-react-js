import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
export const Todo = ({todo, toggleComplete, toggleEdit, deleteTodo}) => {
  
  return (
    <div className="Todo">
      <p className={`${todo.completed ? 'completed' : ""}`} onClick={() => toggleComplete(todo.id)}>{todo.name}</p>
      <div className='icons'>
        <FontAwesomeIcon icon={faCheck} onClick={() => toggleComplete(todo.id)} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => toggleEdit(todo.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
      </div>
    </div>
    )
  }
  