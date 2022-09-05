import { createRef,useState } from 'react'
import './App.css'

type Todo = {
  id: number,
  taskname: string,
  isCompleted: boolean
}

const Card:React.FC<{todo:Todo,setTodoList:Function,todoList:Todo[]}> = ({todo,setTodoList,todoList}) =>{
  const [checked, setChecked] = useState(false)
  return (
    <li>
      <input type="checkbox" className="checkbox" onClick={()=>{setChecked(!checked)}} checked={checked}/>
        {checked ? <s>{todo.taskname}</s>: todo.taskname}
      <button className="delete" onClick={()=>{setTodoList(todoList.filter((t)=>{return t.id!==todo.id}))}}>x</button>
    </li>
  )
}

const App = ()=> {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const inputRef = createRef<HTMLInputElement>()

  return (
     <div className="todoapp">
      <div id="js-form">
        <input
          id="js-form-input"
          className="new-todo"
          placeholder="What need to be done?"
          onKeyDown={(e)=>{
            if(e.key ==="Enter" && !composing){
              if (inputRef.current){
                const newTodo:Todo = {
                  id: Math.random(),
                  taskname: inputRef.current.value,
                  isCompleted: false
                }
                setTodoList([...todoList,newTodo])
                inputRef.current.value=""
              }
            }
          }}
          onCompositionStart={startComposition}
          onCompositionEnd={endComposition}
          ref = {inputRef}
        />
      </div>
      <div id="js-todo-list" className="todo-list">
        <ul>
        {
          todoList.map((todo)=>{
            return <Card todo={todo} setTodoList={setTodoList} todoList={todoList} />
          })
        }
         </ul>
      </div>
      <footer className="footer">
        <span id="js-todo-count">Todoアイテム数: {todoList.length}</span>
      </footer>
    </div>
  )
}

export default App
