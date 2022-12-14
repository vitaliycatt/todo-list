import { useState } from 'react'
import { Todo } from '../components/todo'
import { TodoForm } from '../components/todo-form/todo-form'
import { TodoNav } from '../components/todo-nav'
import styles from './home.module.css'

export const Home = () => {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  const onChange = (e) => {
    setTodoText(e.target.value)
  }

  const onClick = (e) => {
    e.preventDefault()
    addTodo(todoText)
    setTodoText('')
  }

  const addTodo = (todoText) => {
    if (todoText) {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        text: todoText,
        checked: false,
      }
      setTodos([...todos, newTodo])
    }
  }

  const handleKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClick(e)
    }
  }

  const removeTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : { ...todo }
      ),
    ])
  }

  return (
    <>
      <h1 className={styles.title}>TODO</h1>

      <TodoForm
        handleKeySubmit={handleKeySubmit}
        onChange={onChange}
        todoText={todoText}
        onClick={onClick}
      />

      <div className={styles.list}>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={handleToggle}
              removeTodo={removeTodo}
            />
          )
        })}
      </div>
      <TodoNav todoLength={todos.length} />
    </>
  )
}
