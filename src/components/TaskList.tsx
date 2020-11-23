import React, { FormEvent, useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import { firestore } from "../firebase";
import firebase from 'firebase/app'

interface Props {
  list: any
}

const TaskList:React.FC<Props> = ({list}) => {

  const [email, setEmail] = useState('');
  const [hideComplete, setHideComplete] = useState(false);


  const taskRef = firestore.collection('tasks');
  const handleDelete = () => {
    taskRef.doc(list.id).delete()
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    taskRef.doc(list.id).update({
      sharedWith: firebase.firestore.FieldValue.arrayUnion(email)
     
    })
    setEmail('')
  }
  
  return (
    <div>
      <label htmlFor='toggle-complete'>Hide Complete</label>
      <input onChange={() => setHideComplete(!hideComplete)} id='toggle-complete' type='checkbox'/>
      <p>{list.title}</p>
      <form onSubmit={handleSubmit}>
        <input placeholder="valid email adress" value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="submit" value="Share"/>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <TaskInput listId={list.id} />
      {list.tasks && list.tasks.map((task:any, i:number) => (
        <Task key={task.id} task={task} listId={list.id} hideComplete={hideComplete}/>
      ))}

    </div>
  );
}

export default TaskList;
