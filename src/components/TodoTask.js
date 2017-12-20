import React from 'react';

const Task = (props) => {
  console.log(props)
  return (
    <div className="task">
      <p>{props.task.content}</p>
    </div>
  )
}

export default Task
