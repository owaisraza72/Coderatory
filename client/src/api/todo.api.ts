import api from "./axios";
import type { Todo } from "../types/todo.types";

// GET all todos
export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get<{ data: Todo[] }>("/todos");
  return res.data.data;
};

// CREATE todo
export const createTodo = async (title: string, description: string): Promise<Todo> => {
  const res = await api.post<{ data: Todo }>("/todos", { title, description });
  return res.data.data;
};

// UPDATE todo
export const updateTodo = async (
  id: string,
  data: { title?: string; description?: string; completed?: boolean }
): Promise<Todo> => {
  const res = await api.patch<{ data: Todo }>(`/todos/${id}`, data);
  return res.data.data;
};

// DELETE todo
export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};