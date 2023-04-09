import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/task/taskSlice";
import { v4 as uuid } from 'uuid'

import { useNavigate, useParams} from "react-router-dom";

export default function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task);

  const params = useParams();

  const handleChane = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
    
  };

  const handleSubmit = (e) => {

    if(params.id){
      dispatch(editTask(task));
    }else{
      e.preventDefault();
      dispatch(addTask({ 
        ...task, id: uuid(),
      }));
    }
    navigate('/')
  };

  useEffect(() => {
    if(params.id){
      setTask(tasks.find((task) => task.id === params.id));
    }
  
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-xs font-bold mb-2">Task:</label>
      <input name="title" type="text" placeholder="title" onChange={handleChane} value={task.title} className="w-full p-2 rounde-md bg-zinc-600 mb-2"></input>
      
      <label htmlFor="description" className="block text-xs font-bold mb-2">Description:</label>
      <textarea name="description" placeholder="description" onChange={handleChane} value={task.description} className="w-full p-2 rounde-md bg-zinc-600 mb-2" ></textarea>

      <button className="bg-indigo-600 px-2 py-1">Guardar</button>
    </form>
  )
}

