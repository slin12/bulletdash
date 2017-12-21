import React from 'react';
import Notes from './Notes'
import Todo from './Todo';
import Tracker from './Tracker';
import { DragDropContext } from 'react-beautiful-dnd';

class ModuleContainer extends React.Component {
  state = {
    tasks: [],
    note: []
  }

  onDragStart = () => {
    console.log('dragging!')
  }

  resetOrder = (tasksCopy) => {
    const ordered = tasksCopy.map(task => {
      task.order = tasksCopy.indexOf(task)
      return task
    })
    fetch('http://localhost:3000/tasks', {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({tasks: ordered})})
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

  sortTasks = (unsorted) => {
    return unsorted.sort((a, b) => {
      if (a["order"] < b["order"]) {
        return -1
      } else if (a["order"] > b["order"]) {
        return 1
      } else {
        return 0
      }
    })
  }

  deleteTask = (task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => {
        const sorted = this.sortTasks(json)
        this.setState({tasks: sorted})
      })
  }

  handleTaskSubmit = (value) => {
    fetch('http://localhost:3000/tasks', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: value})
    })
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => {
          return {tasks: [...prevState.tasks, json]}
        })
      })
  }

  fetchTasks = () => {
    console.log('fetching...')
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(json => {
        const ordered = this.sortTasks(json)
        this.setState({tasks: ordered}
        )})
  }

  render() {
    console.log(this.state)
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <div className="module-container">
          <div className="row">
            <Notes note={this.state.note}/>
            <Todo tasks={this.state.tasks} handleTaskSubmit={this.handleTaskSubmit} deleteTask={this.deleteTask}/>
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
