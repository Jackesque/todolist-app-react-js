import React, {useState} from 'react'


  
export const EditTodoForm = ({todo, editTodo}) => {
  const [value, setValue] = useState(todo.name);
  
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(todo.id, value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update Task' />
      <button type="submit" className='todo-btn'>Xong</button>
    </form>
    )
  }
  