import React from 'react';
import TodoTask from './TodoTask';
import { Droppable } from 'react-beautiful-dnd';


class Todo extends React.Component {

  tasks = () => {
    return this.props.tasks.map(task => <TodoTask key={task.id} task={task}/>)
  }

  render() {
    return (
      <div className="column column-40 column-offset-10" id="todo">
        <h2>Todo</h2>
        <Droppable droppableId="tasks-container">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {this.tasks()}
            </div>
          )}

        </Droppable>
        <button id="add-task">
          +
        </button>
      </div>
    )
  }
}

export default Todo

//new task?
// <div className="task new-task">
//   <input type="text"></input>
// </div>
