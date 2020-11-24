import React, { useState } from "react";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import {
  StyledTaskTopRow,
  StyledTaskLeft,
  StyledTaskText,
  StyledTaskRight,
  StyledDateInput,
  StyledTaskContainer,
  StyledTaskBottomRow,
} from "./Task.styled";
import { StyledDeleteButton, GlobalmenuButton } from "../SharedStyles";
import { ITask } from "../../types/types";

interface Props {
  task: ITask;
  listId: string;
  hideComplete: boolean;
}

const TaskRow: React.FC<Props> = ({ task, listId, hideComplete }) => {
  const taskRef = firestore.collection("tasks");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDelete = () => {
    taskRef.doc(listId).update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task),
    });
  };

  const handleChange = async () => {
    let localTask = task.id;
    await taskRef
      .doc(listId)
      .get()
      .then((data) => {
        let updatedTasks = data.data()!.tasks.map((task: ITask) => {
          if (task.id !== localTask) return task;
          return { ...task, complete: !task.complete };
        });
        taskRef.doc(listId).update({
          tasks: updatedTasks,
        });
      });
  };

  const handleDateSubmit = async (date: string) => {
    let localTask = task.id;
    await taskRef
      .doc(listId)
      .get()
      .then((data) => {
        let updatedTasks = data.data()!.tasks.map((task: ITask) => {
          if (task.id !== localTask) return task;
          return { ...task, date: date };
        });
        taskRef.doc(listId).update({
          tasks: updatedTasks,
        });
      });
  };

  return (
    <StyledTaskContainer
      hideComplete={hideComplete}
      taskComplete={task.complete}
    >
      <StyledTaskTopRow>
        <StyledTaskLeft>
          <input
            onChange={handleChange}
            type="checkbox"
            checked={task.complete}
          />
          <StyledTaskText
            style={
              task.complete
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {task.text}
          </StyledTaskText>
        </StyledTaskLeft>
        <StyledTaskRight>
          <GlobalmenuButton onClick={() => setShowCalendar(!showCalendar)}>
            <i className="far fa-calendar-alt"></i>
          </GlobalmenuButton>

          <StyledDeleteButton onClick={handleDelete}>
            <i className="far fa-trash-alt"></i>
          </StyledDeleteButton>
        </StyledTaskRight>
      </StyledTaskTopRow>
      <StyledTaskBottomRow>
        <StyledDateInput
          showCalendar={showCalendar}
          type="date"
          onChange={(e) => handleDateSubmit(e.target.value)}
          value={task.date}
        />
      </StyledTaskBottomRow>
    </StyledTaskContainer>
  );
};

export default TaskRow;
