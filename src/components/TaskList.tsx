import React, { FormEvent, useState } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
  list: any;
}

const TaskList: React.FC<Props> = ({ list }) => {
  const taskRef = firestore.collection("tasks");

  const [email, setEmail] = useState("");
  const [hideComplete, setHideComplete] = useState(false);

  const handleDelete = () => {
    taskRef.doc(list.id).delete();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    taskRef.doc(list.id).update({
      sharedWith: firebase.firestore.FieldValue.arrayUnion(email),
    });
    setEmail("");
  };

  const handleDragEnd = async (props: any) => {
    if (!props.destination) return;
    if (
      props.destination.index === props.source.index &&
      props.destination.droppableId === props.source.droppableId
    )
      return;
    let tasks = list.tasks;
    const [reordered] = tasks.splice(props.source.index, 1);
    tasks.splice(props.destination.index, 0, reordered);
    taskRef.doc(list.id).update({
      tasks: tasks,
    });
  };

  return (
    <div>
      <label htmlFor="toggle-complete">Hide Complete</label>
      <input
        onChange={() => setHideComplete(!hideComplete)}
        id="toggle-complete"
        type="checkbox"
      />
      <p>{list.title}</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="valid email adress"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" value="Share" />
      </form>
      <button onClick={handleDelete}>Delete</button>
      <TaskInput listId={list.id} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ backgroundColor: "red", height: "400px" }}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.tasks &&
                  list.tasks.map((task: any, i: number) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <div
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Task
                            task={task}
                            listId={list.id}
                            hideComplete={hideComplete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
