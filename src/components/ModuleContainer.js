import React from "react";
import Notes from "./Notes";
import Todo from "./Todo";
import TrackerButton from "./TrackerButton";
import { DragDropContext } from "react-beautiful-dnd";
import AuthAdapter from "../api/AuthAdapter";

class ModuleContainer extends React.Component {
  state = {
    name: "",
    tasks: [],
    noteValue: ""
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
      if (json.message) {
        localStorage.clear();
        this.props.router.history.push("/login");
      } else {
        console.log(json);
        const ordered = this.sortTasks(json.tasks);
        this.setState({
          tasks: ordered,
          name: json.name,
          noteValue: json.notes[0].content
        });
      }
    });
  };

  render() {
    return this.state.name === "" ? (
      <div id="loading">
        <h1>loading...</h1>
      </div>
    ) : (
      <div>
        <div className="row" id="navbar">
          <div className="column">
            <h1>Hello, {this.state.name}</h1>
            <button id="logout-button" onClick={this.props.logout}>
              Logout
            </button>
          </div>
        </div>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div className="module-container">
            <div className="row">
              <Notes noteValue={this.state.noteValue} />
              <Todo
                tasks={this.state.tasks}
                handleTaskSubmit={this.handleTaskSubmit}
                deleteTask={this.deleteTask}
              />
            </div>
            <div className="row">
              <TrackerButton handleOpen={this.props.handleOpen} />
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default ModuleContainer;
