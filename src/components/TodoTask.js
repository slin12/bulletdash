import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = props => {
  return (
    <div>
      <Draggable draggableId={"draggable-" + props.task.id}>
        {(provided, snapshot) => {
          console.log(provided);
          return (
            <div>
              <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
              >
                <div className="task" id={"task-" + props.task.id}>
                  <span>{props.task.content}</span>
                  <span
                    onClick={() => props.deleteTask(props.task)}
                    className="task-delete"
                  >
                    ✖︎
                  </span>
                </div>
              </div>
              {provided.placeholder
                ? React.cloneElement(provided.placeholder, {
                    className: "task"
                  })
                : null}
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default Task;
