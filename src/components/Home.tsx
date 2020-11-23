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
  const query = taskRef.where('owner', '==', `${user.uid}`)
  const [taskLists] = useCollectionData(query)
  
  return (
    <div>
      <SignOut />
      <CreateList/>
      {taskLists && taskLists.map((list:any, i) => (
        <TaskList key={list.id} list={list}/>
      ))}
    </div>
  );
}

export default Home;
