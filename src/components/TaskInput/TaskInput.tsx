import React, { FormEvent, useState } from "react";
import { firestore } from "../../firebase";
import { v4 as uuid } from "uuid";
import firebase from "firebase/app";
import {
  StyledInputContainer,
  StyledForm,
  StyledInput,
  StyledButton,
} from "./TaskInput.styled";

interface Props {
  listId: string;
}

const TaskInput: React.FC<Props> = ({ listId }) => {
  const [task, setTask] = useState("");
  const taskRef = firestore.collection("tasks");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (task === "") return;
    let id = uuid();
    let newTask = {
      text: task,
      id,
      complete: false,
      date: "",
    };
    setTask("");
    await taskRef.doc(listId).update({
      tasks: firebase.firestore.FieldValue.arrayUnion(newTask),
    });
  };

  return (
    <StyledInputContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={task}
          placeholder={"Add a task"}
          onChange={(e) => setTask(e.target.value)}
        />
        <StyledButton type="submit">+</StyledButton>
      </StyledForm>
    </StyledInputContainer>
  );
};

export default TaskInput;
