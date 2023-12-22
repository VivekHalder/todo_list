import { createContext, useContext } from 'react';

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo_val: "Todo Task",
            completed: false,
        }
    ],
    createTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;