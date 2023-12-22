import React, { useEffect } from "react";
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = React.useState([]);

  const createTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), todo_val: todo.todo_val, completed: false }
    ]);
  };  

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((each_todo) => (each_todo.id === id ? todo : each_todo)));
  };

  const deleteTodo = (id) => { 
    setTodos((prev) => prev.filter((each_todo) => each_todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((each_todo) =>
        each_todo.id === id ? { ...each_todo, completed: !each_todo.completed } : each_todo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoProvider value={{ todos, createTodo, updateTodo, deleteTodo, toggleComplete }}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/* Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
