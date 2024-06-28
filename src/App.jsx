import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Task, setTask] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [HideFinished,SetHideFinished] = useState(false);

  useEffect(() => {
    let todostring = localStorage.getItem("LocalTasks");
    if(todostring){
      let Localtasks = JSON.parse(localStorage.getItem("LocalTasks"));
      setTasks(Localtasks);
    }
  },[])
  

  const SaveToLocalStorage = ()=>{
    localStorage.setItem("LocalTasks", JSON.stringify(Tasks));
  }

  const HandleChange = (e) => {
    setTask(e.target.value);
  }

  const HandleAdd = () => {
    if(Task.length>=1){
      setTasks([...Tasks, {id:uuidv4(), Task, isCompleted: false }]);
      setTask("");
      console.log(Tasks);
      SaveToLocalStorage();
    }
    else{
      alert('Please Add a Task First!!');
    }
  }

  const HandleEdit = (Id) => {
    const taskindex = Tasks.findIndex(item=>{
      return item.id===Id;
    })
    setTask(Tasks[taskindex].Task)
    HandleRemove(Id);
    SaveToLocalStorage();
  }

  const HandleRemove = (id) => {
    const updatedtasks = Tasks.filter(item=>{
      return item.id != id;
    })
    setTasks(updatedtasks);
    SaveToLocalStorage();
  }

  const HandleCheckBox = (e)=>{
    let Id = e.target.value;
    const taskindex = Tasks.findIndex(item=>{
      return item.id === Id;
    });
    console.log(taskindex);
    let newtasks = [...Tasks];
    console.log(newtasks[taskindex].isCompleted)
    newtasks[taskindex].isCompleted = !newtasks[taskindex].isCompleted;
    setTasks(newtasks);
    SaveToLocalStorage();
  }

  const ToggleFinished = (e)=>{
    SetHideFinished(!HideFinished);
  }
  

  return (
    <>
      <Navbar />
      <div className='bg-black p-1'></div>
      <div className="container p-3 bg-green-100 mt-6 md:w-4/6 m-auto h-[80vh] rounded-3xl">
        <div className="Addtasks">
          <h2 className=' text-2xl text-slate-800 font-bold'>Add Task</h2>
          <section className="text-gray-600 body-font flex">
            <div className=" mt-2">
              <input onChange={HandleChange} value={Task} type="text" placeholder='add task' id="name" name="name" className=" w-[41vw] bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
            </div>
            <div className="p-2">
              <button onClick={HandleAdd} className=" text-white bg-emerald-300 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-400 rounded-xl text-lg">Save</button>
            </div>
          </section>
        </div>
        <h2 className=' text-2xl text-slate-800 font-bold'>Your Tasks</h2>
        <div className='flex items-center ml-2'>
          <input onChange={e=>{ToggleFinished(e)}} type="checkbox" checked={HideFinished} name="" id="" />
          <span className=' text-sm font-medium ml-2'>Hide Finished</span>
        </div>
        <div className="taskcontainer overflow-y-scroll h-[54vh] shadow-inner shadow-black rounded-2xl">
        {Tasks.length===0 && <p className=' text-center text-lg'>No More Tasks for Today!</p>}
          {Tasks.map(item => {
            return (!HideFinished || !item.isCompleted) && <div key={item.id} className="tasks flex justify-between items-center my-2 mx-2">
              <input onChange={e=>{HandleCheckBox(e)}} type="checkbox" value={item.id} checked={item.isCompleted} name="" id="" />
              <h3 className={item.isCompleted?"line-through":""}>{item.Task}</h3>
              <div className="EditDel flex gap-4">
                <button onClick={()=>{HandleEdit(item.id)}} className=" text-white bg-emerald-300 border-0 py-1 px-4 focus:outline-none hover:bg-emerald-400 rounded-xl text-base"><FaEdit /></button>
                <button onClick={()=>{HandleRemove(item.id)}} className=" text-white bg-emerald-300 border-0 py-1 px-3 focus:outline-none hover:bg-emerald-400 rounded-xl text-base"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
