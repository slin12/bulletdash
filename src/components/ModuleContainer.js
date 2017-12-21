import React from 'react';
import Notes from './Notes'
import Todo from './Todo';
import Tracker from './Tracker';
import { DragDropContext } from 'react-beautiful-dnd';

class ModuleContainer extends React.Component {
  state = {
    tasks: []
  }

  onDragStart = () => {
    console.log('dragging!')
  }

  resetOrder = (tasksCopy) => {
    return tasksCopy.map(task => {
      return task.order = tasksCopy.indexOf(task)
    })
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const task = this.state.tasks[startIndex]
    const endIndex = result.destination.index;
    let tasksCopy = this.state.tasks.slice()
    if (startIndex !== endIndex) {
      tasksCopy.splice(startIndex, 1);
      tasksCopy.splice(endIndex, 0, task)
      this.resetOrder(tasksCopy)
      this.setState({tasks: tasksCopy })
    }
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(json => {
        this.setState({tasks: json}
        )})
  }

  render() {
    console.log(this.state)
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <div className="module-container">
          <div className="row">
            <Notes />
            <Todo tasks={this.state.tasks}/>
          </div>
          <div className="row">
            <Tracker />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default ModuleContainer
