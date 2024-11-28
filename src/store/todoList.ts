/**
 * Copyright ⓒ 2011 HelloMarket Inc. All Rights Reserved.
 */
import { create } from 'zustand';

type TodoTask = {
  id: number;
  task: string;
  isCompleted: boolean;
};

type TodoListStore = {
  todoList: TodoTask[];
  todoStatus: string;
  setTodoList: (newTask: TodoTask) => void;
  removeTodo: (id: number) => void;
  toggleTodoCompleted: (id: number) => void;
  setTodoStatus: (newStatus: string) => void;
};

const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: [],
  todoStatus: 'all',
  setTodoList: (newTask: TodoTask) =>
    set((state) => ({
      todoList: [...state.todoList, newTask]
    })),
  removeTodo: (id: number) =>
    set((state) => ({
      todoList: state.todoList.filter((todo) => todo.id !== id)
    })),
  toggleTodoCompleted: (id) =>
    set((state) => {
      const updatedList = state.todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      return { todoList: updatedList };
    }),
  setTodoStatus: (newStatus: string) => set({ todoStatus: newStatus })
}));

export default useTodoListStore;
