
import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext{
  todos: TTodo[];
  doneTodos: TTodo[];
  completeTodo: (todo:TTodo)=> void;
  deleteTodo: (todo:TTodo)=> void;
  addTodo: (text: string)=> void;
}
export const TodoContext=createContext<ITodoContext |undefined>
(undefined);

export const TodoProvider = ({children}:{children:ReactNode}):ReactElement=>{

  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo=(text:string):void=>{
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
  };
  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };
  return(
    <TodoContext.Provider value={{todos, doneTodos,addTodo, completeTodo,deleteTodo}}>{children}</TodoContext.Provider>
  )
};
export const useTodo=():ITodoContext=>{
  const context = useContext(TodoContext);
  if(!context){
    throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다. ');
  };

  return context;
};