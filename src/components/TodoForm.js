import React, {useState} from 'react'

// take in addTodo prop
export const TodoForm = ({addTodo}) => {
  // receive user input
  // blank initial state
  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // when the input is not blank
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue('');
    }
  };
  return (
    // when user press submit
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* change value based on keyboard input */}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Thêm người lau nhà' />
      {/* submit button */}
      <button type="submit" className='todo-btn'>Thêm</button>
    </form>
    )
  }
  