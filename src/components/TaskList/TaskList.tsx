import React, { useState } from "react";
import Task from "../Task/Task";
import { firestore } from "../../firebase";
import TaskInput from "../TaskInput/TaskInput";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  StyledTaskList,
  StyledTaskListHeader,
  StyledListHeading,
} from "./TaskList.styled";
import { IList, ITask } from "../../types/types";

interface Props {
  list: IList;
}

const TaskList: React.FC<Props> = ({ list }) => {
  const taskRef = firestore.collection("tasks");
  const [hideComplete, setHideComplete] = useState(false);

  const handleDragEnd = async (props: any) => {
    console.log(props);
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
      <StyledTaskListHeader>
        <StyledListHeading>{list.title}</StyledListHeading>
        <DropDownMenu
          setHideComplete={setHideComplete}
          hideComplete={hideComplete}
          list={list}
        />
      </StyledTaskListHeader>
      <TaskInput listId={list.id} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <Droppable droppableId={list.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.tasks &&
                  list.tasks.map((task: ITask, i: number) => (
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
