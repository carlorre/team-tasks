import React from 'react';
import { firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../firebase";
import TaskList from './TaskList';
import CreateList from './CreateList';
import SignOut from './SignOut';

const Home = () => {
  const [user] = useAuthState(auth)
  const taskRef = firestore.collection('tasks');
  const myLists = taskRef.where('owner', '==', `${user.uid}`)
  const [taskLists] = useCollectionData(myLists)

  const sharedWithMe = taskRef.where('sharedWith', 'array-contains', `${user.email}`)
  console.log(user.email)
  const [sharedLists] = useCollectionData(sharedWithMe)
  console.log(sharedLists)
  return (
    <div>
      <SignOut />
      <CreateList/>
      <h1>My Lists</h1>
      {taskLists && taskLists.map((list:any, i) => (
        <TaskList key={list.id} list={list}/>
      ))}
      <h1>Shared with me</h1>
      {sharedLists && sharedLists.map((list:any, i) => (
        <TaskList key={list.id} list={list}/>
      ))}
    </div>
  );
}

export default Home;
