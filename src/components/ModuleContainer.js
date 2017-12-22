import React from "react";
import Notes from "./Notes";
import Todo from "./Todo";
import Tracker from "./Tracker";
import { DragDropContext } from "react-beautiful-dnd";
import AuthAdapter from "../api/AuthAdapter";

class ModuleContainer extends React.Component {
  state = {
    name: "",
    tasks: [],
    note: []
  };

  onDragStart = () => {
    console.log("dragging!");
  };

  resetOrder = tasksCopy => {
    const ordered = tasksCopy.map(task => {
      task.order = tasksCopy.indexOf(task);
      return task;
    });
    AuthAdapter.updateTasks(ordered);
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const task = this.state.tasks[startIndex];
    const endIndex = result.destination.index;
    let tasksCopy = this.state.tasks.slice();
    if (startIndex !== endIndex) {
      tasksCopy.splice(startIndex, 1);
      tasksCopy.splice(endIndex, 0, task);
      this.resetOrder(tasksCopy);
      this.setState({ tasks: tasksCopy });
    }
  };

  componentDidMount() {
    if (!localStorage.getItem("jwt")) {
      this.props.router.history.push("/login");
    } else {
      this.fetchUserInfo();
    }
  }

  sortTasks = unsorted => {
    return unsorted.sort((a, b) => {
      if (a["order"] < b["order"]) {
        return -1;
      } else if (a["order"] > b["order"]) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  deleteTask = task => {
    AuthAdapter.deleteTask(task.id).then(json => {
      const sorted = this.sortTasks(json);
      this.setState({ tasks: sorted });
    });
  };

  handleTaskSubmit = value => {
    AuthAdapter.submitTask(value).then(json => {
      this.setState(prevState => {
        return { tasks: [...prevState.tasks, json] };
      });
    });
  };

  fetchUserInfo = () => {
    AuthAdapter.userModules().then(json => {
      const ordered = this.sortTasks(json.tasks);
      console.log(json);
      this.setState({ tasks: ordered, name: json.name });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="row" id="navbar">
          <div className="column">
            <h1>Hello, {this.state.name}</h1>
          </div>
        </div>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div className="module-container">
            <div className="row">
              <Notes note={this.state.note} />
              <Todo
                tasks={this.state.tasks}
                handleTaskSubmit={this.handleTaskSubmit}
                deleteTask={this.deleteTask}
              />
            </div>
            <div className="row">
              <Tracker />
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default ModuleContainer;
