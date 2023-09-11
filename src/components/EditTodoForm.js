import React, {useState} from 'react'

export const EditTodoForm = ({todo, toggleEdit, editTodo}) => {
  // value is todo name that is edited
  const [value, setValue] = useState(todo.name);
  
  const handleSubmit = (e) => {

    // prevent default action
    e.preventDefault();

    // if there is no change, only toggle edit
    if (value === todo.name || value === "") {
      toggleEdit(todo.id);
      return;
    }
    
    // if there is change, edit todo and set completed to false
    editTodo(todo.id, value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* change value into what the user type */}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Thay Tên' />
      {/* when button is pressed, handleSubmit run */}
      <button type="submit" className='todo-btn'>Xong</button>
    </form>
    )
  }
  