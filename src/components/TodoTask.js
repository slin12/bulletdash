import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
  console.log(props)
  return (
      <Draggable draggableId={"draggable-" + props.task.id}>
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              style={provided.draggableStyle}
              {...provided.dragHandleProps}
            >
                <div className="task">
                  <p>{props.task.content}</p>
                </div>
              </div>
              {provided.placeholder}
          </div>
        )}
      </Draggable>
  )
}

export default Task
