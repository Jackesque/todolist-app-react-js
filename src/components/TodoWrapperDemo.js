import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "./Todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

  // swap elements in an array
  const swapElementToNext = (array, id) => {
    let swapIndex = 0;
    // find the index of the element
    for (const element of array) {
      if(element.id !== id) ++swapIndex;
      else break;
    }

    // swap with the next element
    if(swapIndex < array.length - 1)
      [array[swapIndex], array[swapIndex+1]] = [array[swapIndex+1], array[swapIndex]];
  };

  // toggle snooze count: swap down the todo and add 1 to snoozeCount
  const toggleSnooze = (id) => {
    swapElementToNext(todos, id);
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

  // delete all completed todos
  const deleteCompleted = () => setTodos(todos.filter((todo) => todo.completed === false));

  // delete a todo: filter out the todo with arg id
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <div className="TodoWrapper">
      <h1>Ai Lau Nhà Tuần Này?</h1>

      {/* show who mops this week */}
      {todos.length > 0 && (<div className='WhoMops'>
        Tuần này&nbsp;
        <span className='TheOneWhoMops'>{
          // self-calling anonymous function
          (() => {
            for (const todo of todos)
              if (todo.completed === false)
                return todo.name;
          })()
        }</span>
        &nbsp;lau nhà nha
      </div>)}

      {/* add a todo */}
      <TodoForm addTodo={addTodo} />

      {/* display a button to delete all completed todos */}
      {todos.length > 0 && (<button className="todo-btn" 
      style={{display: "flex", margin: "auto 0 1rem auto"}} 
      onClick={() => deleteCompleted()}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>)}

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
            todos={todos}
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
