import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { auth, firestore } from "../firebase";
import { v4 as uuid } from 'uuid'
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/app'
import { io } from "socket.io-client"

interface Props {
  listId: string
}

const TaskInput:React.FC<Props> = ({listId}) => {

  const textInput = useRef<any>()
  const socketRef = useRef<any>()

  const sendKeyUpToServer = (e:any) => socketRef.current.emit('message', e.target.value)

  useEffect(() => {
    socketRef.current = io('localhost:5000')
    socketRef.current.on('message', (data:string) => {
      if (textInput.current === null) return
      else textInput.current.value = data
    })
    return () => {};
  }, []);

  const [task, setTask] = useState('');
  const taskRef = firestore.collection('tasks');
  const [ user ] = useAuthState(auth)
  
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    if (task === '') return
    let id = uuid()
    let newTask = {
      text: task,
      id,
      complete: false,
      date: '',
    }
    setTask('')
    await taskRef.doc(listId).update({
      tasks: firebase.firestore.FieldValue.arrayUnion(newTask)
    })
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onKeyUp={sendKeyUpToServer} ref={textInput} type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
      <input type="submit"/>
    </form>
  );
}

export default TaskInput;
