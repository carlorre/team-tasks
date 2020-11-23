import React from "react";
import { firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../firebase";
import TaskList from "./TaskList";
import CreateList from "./CreateList";
import { StyledSection } from "./Home.styled";

const Home = () => {
  const [user] = useAuthState(auth);
  const taskRef = firestore.collection("tasks");
  const myLists = taskRef.where("owner", "==", `${user.uid}`);
  const [taskLists] = useCollectionData(myLists);
  const sharedWithMe = taskRef.where("sharedWith", "array-contains",`${user.email}`);
  const [sharedLists] = useCollectionData(sharedWithMe);
 

  return (
    <StyledSection>
      <CreateList />
      <div>
        {taskLists &&
          taskLists.map((list: any, i) => (
            <TaskList key={list.id} list={list} />
          ))}
      </div>
      {/* {sharedLists &&
        sharedLists.map((list: any, i) => (
          <TaskList key={list.id} list={list} />
        ))} */}
    </StyledSection>
  );
};

export default Home;
