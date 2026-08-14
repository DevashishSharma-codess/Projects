import {React , useState , useEffect} from 'react'
import axios from 'axios'
const App = () => {
  const [todos, setTodos] = useState([]);
   const [text, setText] = useState("");

const fetchTodos = async ()=>{
  const res = await axios.get("http://localhost:3000/todos");
  setTodos(res.data);
}



const createTodo = async (text)=>{
  if(!text) return;
  const res = await axios.post("http://localhost:3000/todos/create" , {text});
  console.log(res.data);
  setTodos([...todos , res.data]);
  setText("");
}

const deleteTodo = async (id)=>{
  const res = await axios.delete(`http://localhost:3000/todos/${id}`);
setTodos(res.data);
}

useEffect(()=>{
  fetchTodos();
},[])

  return (
    <div>
      <input type="text" placeholder="Enter todo" value={text} onChange= {(e)=>setText(e.target.value)}/>
      <button onClick={()=>createTodo(text)}>Add Todos</button>
      <ul>
        {todos.map((todo)=> (
          <div>
            <li key={todo.id}>{todo.text}</li>
            <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>

  )
}

export default App