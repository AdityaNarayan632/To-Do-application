import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e) => {
    let id = e.target.name
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto p-5 my-5 bg-violet-200 rounded-xl min-h-[80vh] ">
        <div className="addtodo"></div>
        <h2 className='text-lg font-bold flex my-5'>Add Todo</h2>
        <input onChange={handleChange} value={todo} type="text" placeholder='Add Tasks' className='w-1/2 border-2 hover:border-purple-500 rounded-lg p-1' />
        <button onClick={handleAdd} className='bg-violet-400 hover:bg-violet-600 w-12 p-1 mx-2 rounded-lg text-white font-bold p-1'>Add</button>


        <h2 className='text-lg font-bold mt-5'>Your Todos</h2>
        <div className="todos">
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-1/2 justify-between my-2">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" name={item.id} value={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button">
                <button onClick={handleEdit} className="edit bg-violet-400 hover:bg-violet-600 w-12 p-1 mx-2 rounded-lg text-white font-bold" name={item.id}>Edit</button>
                <button onClick={handleDelete} className="delete bg-violet-400 hover:bg-violet-600 w-auto p-1 mx-2 rounded-lg text-white font-bold" name={item.id}>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}
export default App
