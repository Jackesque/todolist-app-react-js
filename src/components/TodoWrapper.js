import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm';
import { Todo } from './Todo';
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);
  
  const addTodo = (name) => {
    const newTodos = [...todos, 
      { id: uuidv4(), 
        name: name, 
        completed: false, 
        snoozeCount: 0, 
        isEditing: false
      }
    ];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const swapElements = (array, id) => {
    let swapIndex = 0;
    for (const element of array) {
      if(element.id !== id) ++swapIndex;
      else break;
    }
    if(swapIndex < array.length - 1)
      [array[swapIndex], array[swapIndex+1]] = [array[swapIndex+1], array[swapIndex]];
  };
  
  const toggleSnooze = (id) => {
    swapElements(todos, id);
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, snoozeCount: ++todo.snoozeCount } : todo);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  
  const toggleEdit = (id) => {
    const newTodos = todos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  
  const editTodo = (id, name) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, name: name, completed: false, isEditing: !todo.isEditing} : todo);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
    
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  return (
    <div className='TodoWrapper'>
      <h1>Ai Lau Nhà Tuần Này?</h1>
      {todos.length !== 0 ? (<div className='WhoMops'>
        Tuần này&nbsp;
        <span className='TheOneWhoMops'>{
          (() => {
            for (const todo of todos)
              if (todo.completed === false)
                return todo.name;
          })()
        }</span>
        &nbsp;lau nhà nha
      </div>) : (<p></p>)}

      <TodoForm addTodo={addTodo} />

      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm 
            todo={todo} 
            toggleEdit={toggleEdit} 
            editTodo={editTodo} 
          />
        ) : (
          <Todo 
            key={index} 
            todo={todo} 
            addTodo={addTodo}
            toggleComplete={toggleComplete} 
            toggleSnooze={toggleSnooze} 
            toggleEdit={toggleEdit} 
            deleteTodo={deleteTodo} 
          />
        )
      ))}
    </div>
  );
};
        