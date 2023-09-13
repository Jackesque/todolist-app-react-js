import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faBed, faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({todo, addTodo, toggleComplete, toggleSnooze, toggleEdit, deleteTodo}) => {
  
  return (
    <div className="Todo">
      {/* change css for completed todo */}
      <p className={`${todo.completed ? 'completed' : ""}`} onClick={() => toggleComplete(todo.id)}>{todo.name}</p>

      {/* I want to move the component down to the end 
      but react doesnt allow 2 hooks in the same component
      so this is a workaround: 
      when click, delete todo; then on mouse up, add that todo back down */}
      <div className='icons'>
        <FontAwesomeIcon icon={faCheck} 
          onClick={() => toggleComplete(todo.id)} 
          onMouseUp={()=> {
            if (todo.completed === false)
              addTodo(todo.name);
          }}  
        />
        {todo.snoozeCount === 0 ? (
          <FontAwesomeIcon icon={faBed} 
          onClick={() => {
            if (todo.completed === false)
              toggleSnooze(todo.id);
          }
        }
          />
        ) : (
          <p className={`${todo.snoozeCount < 2 ? '' : todo.snoozeCount < 4 ? 'warning' : 'danger'}`} 
            onClick={() => {
              if (todo.completed === false)
                toggleSnooze(todo.id);
            }
          }>{todo.snoozeCount}</p>)
        }
        <FontAwesomeIcon icon={faPenToSquare} 
          onClick={() => toggleEdit(todo.id)} 
        />
        <FontAwesomeIcon icon={faTrash} 
          onClick={() => deleteTodo(todo.id)} 
        />
      </div>
    </div>
    )
  }
  