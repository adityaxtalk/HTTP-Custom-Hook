import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks}= useHttp();

  useEffect(()=>{
    const transformTasks= (tasksObj)=> {
      const loadedTasks=[];

      for (const taskKey in tasksObj) {
        loadedTasks.push({id: taskKey, text: tasksObj[taskKey].text});
      }

      setTasks(loadedTasks);
    };

    fetchTasks({
      url: 'https://my-data-api-8a0f5-default-rtdb.firebaseio.com/tasks.json'
    }, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler=(task)=>{
    setTasks((prevTasks)=> prevTasks.concat(task));
  };
  return (
    <>
      <NewTask onAddTask={taskAddHandler}/>
      <Tasks 
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
