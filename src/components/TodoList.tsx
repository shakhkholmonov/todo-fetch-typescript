"use client";

import React from "react";

type Todo = {
  id: number;
  title: string;
};

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onEditTodo: (todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = ({ onDeleteTodo, onEditTodo, todos }) => {
  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });

    onDeleteTodo(id);

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div style={{ width: "500px", height: "auto", boxShadow: "4px 4px 4px 8px 0px rgba(34, 60, 80,0.2)", padding: 2 }}>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => onEditTodo(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
