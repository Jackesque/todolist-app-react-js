import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "./Todo";

export const TodoWrapperDemo = () => {
  // create a todos array
  const [todos, setTodos] = useState([
    { id: uuidv4(), 
      name: "Tiến", 
      completed: false, 
      snoozeCount: 0, 
      isEditing: false 
    },
    { id: uuidv4(), 
      name: "Thái", 
      completed: false, 
      snoozeCount: 0, 
      isEditing: false 
    },
    { id: uuidv4(), 
      name: "Trí", 
      completed: false, 
      snoozeCount: 0, 
      isEditing: false 
    },
    { id: uuidv4(), 
      name: "Hiệp", 
      completed: false, 
      snoozeCount: 0, 
      isEditing: false 
    }]);

  // add a todo
  const addTodo = (name) => {

    // destructuring to add a new todo to current todos
    // eg: have todos=[todo1, td2]. when add td3: [..todos, td3]
    setTodos([
      ...todos,

      /**
      * define a todo here
      * - id: to select indiv todo
      * - name: name of todo
      * - completed: to toggle strikethru css 
      * - snoozeCount: number of time snoozed
      * - isEditing: to use edit button
      */
      { id: uuidv4(), 
        name: name, 
        completed: false,
        snoozeCount: 0, 
        isEditing: false 
      }
    ]);
  }

  // toggle complete: check for id then flip completed prop of selected id
  const toggleComplete = (id) => {

    // use setTodo to reset the whole todos
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, snoozeCount: ++todo.snoozeCount } : todo
      )
    );
  }

  // toggle edit: toggle prop isEditing for selected id
  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  // edit a todo: check id then change name and change completed to false
  // because if a todo is edited then it is not completed
    const editTodo = (id, name) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, name: name, completed: false, isEditing: !todo.isEditing } : todo
        )
      );
    };

  // delete a todo: filter out the todo with arg id
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <div className="TodoWrapper">
      <h1>Ai Lau Nhà Tuần Này?</h1>
      {todos.length !== 0 ? (<p className="WhoMops">{
        // self-calling anonymous function
        (() => {
          for (const todo of todos)
            if (todo.completed === false)
              return todo.name;
        })()
      }</p>) : (<p></p>)}

      {/* add a todo */}
      <TodoForm addTodo={addTodo} />

      {/* display todos */}
      {todos.map((todo) => (

        // editing case
        todo.isEditing ? (
          <EditTodoForm 
            todo={todo} 
            toggleEdit={toggleEdit} 
            editTodo={editTodo}
          />
        ) : (

          // display case
          <Todo
          // key prop is required
            key={todo.id}
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
