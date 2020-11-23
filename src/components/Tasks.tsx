import React from 'react';
import { firestore } from "../firebase";
import firebase from 'firebase/app'

interface Props {
  task: any
  listId: string
}

const TaskRow:React.FC<Props> = ({task, listId}) => {
  const taskRef = firestore.collection('tasks');
  
  const handleDelete = () => {
    taskRef.doc(listId).update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task)
    })
  }

  const handleChange = async () => {
    let localTask = task.id
    await taskRef.doc(listId).get().then((data) => {
      let updatedTasks = data.data()!.tasks.map((task:any) => {
          // return console.log(task.id)
        if (task.id !== localTask) return task;
        return {...task, complete: !task.complete}
      })
      taskRef.doc(listId).update({
        tasks: updatedTasks
      })
    })
  }

  return (
    <div>
      <p>{task.text}</p>
      <input onChange={handleChange} type='checkbox' checked={task.complete}/>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskRow;
