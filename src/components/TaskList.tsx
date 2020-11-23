import React from 'react';
import TaskInput from './TaskInput';
import TaskRow from './Tasks';
import { firestore } from "../firebase";

interface Props {
  list: any
}

const TaskList:React.FC<Props> = ({list}) => {
  
  const taskRef = firestore.collection('tasks');
  const handleDelete = () => {
    taskRef.doc(list.id).delete()
  }

  return (
    <div>
      <p>{list.title}</p>
      <button onClick={handleDelete}>Delete</button>
      <TaskInput listId={list.id}/>
      {list.tasks && list.tasks.map((task:any, i:number) => (
        <TaskRow key={task.id} task={task} listId={list.id}/>
      ))}
    </div>
  );
}

export default TaskList;
