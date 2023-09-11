import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  // create a todos array
  const [todos, setTodos] = useState([]);

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
      * - isEditing: to use edit button
      */
      { id: uuidv4(), name: name, completed: false, isEditing: false },
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

  // delete a todo: filter out the todo with arg id
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

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

  return (
    <div className="TodoWrapper">
      <h1>Ai Lau Nhà Tuần Này?</h1>

      {/* add a todo */}
      <TodoForm addTodo={addTodo} />

      {/* display todos */}
      {todos.map((todo) =>

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
            toggleComplete={toggleComplete}
            toggleEdit={toggleEdit}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </div>
  );
};
