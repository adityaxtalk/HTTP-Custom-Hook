import React from 'react'
import useHttp from '../../hooks/use-http'
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading,error, sendRequest: sendTaskRequest}= useHttp();

  const createTask = (taskText, taskData)=>{
    const generateId= taskData.name;
    const createdTask ={id: generateId, text: taskText}

    props.onAddTask(createdTask);
  }

  const enterTaskHandler= async (taskText) => {
    sendTaskRequest(
        {
            url: 'https://my-data-api-8a0f5-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                text: taskText
            }
        },
        createTask.bind(null, taskText)
    );
  };
  return (
    <Section>
        <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
        {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask
