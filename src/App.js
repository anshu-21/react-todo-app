import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const getData = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
  };

  const [tasks, setTasks] = useState(getData());
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const saveData = JSON.stringify(tasks);
    localStorage.setItem("tasks", saveData);
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTasks([...tasks].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedtasks = [...tasks].filter((todo) => todo.id !== id);
    setTasks(updatedtasks);
  }

  function toggleComplete(id) {
    let updatedtasks = [...tasks].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTasks(updatedtasks);
  }

  function submitEdits(id) {
    const updatedtasks = [...tasks].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTasks(updatedtasks);
    setTodoEditing(null);
  }

  return (
    <div id="list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add</button>
      </form>
      {tasks.map((todo) => (
        <div key={todo.id} className="task">
          <div className="userInput">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="listItems">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>📝</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
