import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto  w-10/12 bg-zinc-950 bg-opacity-95 text-white p-2 m-3 rounded-lg min-h-[90vh] brightness-90">
        <div className='font-normal underline text-center text-3xl'>
          iTask - Manage your todos at one place
        </div>
        <div className="addTodo text-2xl my-5">
          <h1>Add Todo</h1>
        </div>
        <input onChange={handleChange} value={todo} className='bg-slate-300 hover:border-gray-500 mt-4 px-3 py-1 w-1/2 text-black font-semibold rounded-lg' type="text" />
        <button onClick={handleAdd} disabled={todo.length <= 1} className='rounded-sm bg-stone-600 hover:bg-stone-700 hover:text-white hover:rounded-md mx-6 p-2 transition-all hover:duration-300 hover:border-white hover:border hover:font-bold disabled:bg-stone-700 cursor-pointer'><IoMdAdd />
        </button>
        <div className='Finished mt-4'>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        </div>
        <h1 className='text-2xl font-mono pt-9 underline text-center'>Your Todos</h1>
        <div className="todos mt-5">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-5/6 my-3 mt-4">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons mx-60 flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='mr-3 px-3 p-2 rounded-sm bg-stone-600 hover:bg-stone-700 hover:text-white hover:rounded-md  transition-all hover:duration-300 hover:border-white hover:border hover:font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='ml-3 px-3 p-2 rounded-sm bg-stone-600 hover:bg-stone-700 hover:text-white hover:rounded-md  transition-all hover:duration-300 hover:border-white hover:border hover:font-bold'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
