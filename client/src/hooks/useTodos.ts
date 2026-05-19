import { useState, useEffect } from "react"
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from "../api/todo.api"

type TodosHook = {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
  editTodo: (id: string, data: { title?: string; completed?: boolean }) => Promise<void>
  removeTodo: (id: string) => Promise<void>
}

export const useTodos = (): TodosHook => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getTodos()
      setTodos(res)
    } catch (err: any) {
      setError(err?.message || "Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (title: string) => {
    setLoading(true)
    setError(null)
    try {
      const newTodo = await createTodo(title)
      setTodos((prev) => [...prev, newTodo])
    } catch (err: any) {
      setError(err?.message || "Failed to create todo")
    } finally {
      setLoading(false)
    }
  }

  const editTodo = async (id: string, data: { title?: string; completed?: boolean }) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await updateTodo(id, data)
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)))
    } catch (err: any) {
      setError(err?.message || "Failed to update todo")
    } finally {
      setLoading(false)
    }
  }

  const removeTodo = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t._id !== id))
    } catch (err: any) {
      setError(err?.message || "Failed to delete todo")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return { todos, loading, error, fetchTodos, addTodo, editTodo, removeTodo }
}