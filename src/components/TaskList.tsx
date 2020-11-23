import React, { FormEvent, useState } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StyledTaskList, StyledTaskListHeading } from "./TaskList.styled";
import DropDownMenu from "./DropDownMenu";


interface Props {
  list: any;
}

const TaskList: React.FC<Props> = ({ list }) => {
  const taskRef = firestore.collection("tasks");
  const [hideComplete, setHideComplete] = useState(false);





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
    <StyledTaskList>
      <StyledTaskListHeading>
        <h1>{list.title}</h1>
        <DropDownMenu setHideComplete={setHideComplete} hideComplete={hideComplete} list={list}/>
      </StyledTaskListHeading>
      
      
      
     
      <TaskInput listId={list.id} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
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
    </StyledTaskList>
  );
};

export default TaskList;
