import React from 'react';
import Notes from './Notes'
import Todo from './Todo';
import Tracker from './Tracker';

class ModuleContainer extends React.Component {
  state = {
    tasks: []
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
      <div className="module-container">
        <div className="row">
          <Notes />
          <Todo tasks={this.state.tasks}/>
        </div>
        <div className="row">
          <Tracker />
        </div>
      </div>
    )
  }
}

export default ModuleContainer
