import React from 'react';
import TodoTask from './TodoTask'

const Todo = (props) => {
  function tasks() {
    return props.tasks.map(task => <TodoTask key={task.id} task={task}/>)
  }

  return (
    <div className="column column-40 column-offset-10" id="todo">
      <h2>Todo</h2>
      <div id="tasks-container">
        {tasks()}
        <div className="task new-task">
          <input type="text"></input>
        </div>
      </div>
    </div>
  )
}

export default Todo
