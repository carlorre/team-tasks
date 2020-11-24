import React from "react";
import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TaskList from "../TaskList/TaskList";
import CreateList from "../CreateList/CreateList";
import { StyledSection } from "./Home.styled";

interface Props {
  user: any;
}

const Home: React.FC<Props> = ({ user }) => {
  const taskRef = firestore.collection("tasks");
  const myLists = taskRef.where("owner", "==", `${user.uid}`);
  const [taskLists] = useCollectionData(myLists);
  const sharedWithMe = taskRef.where(
    "sharedWith",
    "array-contains",
    `${user.email}`
  );
  const [sharedLists] = useCollectionData(sharedWithMe);

  return (
    <StyledSection>
      <CreateList user={user} />
      <div>
        {taskLists &&
          taskLists.map((list: any) => <TaskList key={list.id} list={list} />)}
      </div>
      <div>
        {sharedLists &&
          sharedLists.map((list: any) => (
            <TaskList key={list.id} list={list} />
          ))}
      </div>
    </StyledSection>
  );
};

export default Home;
