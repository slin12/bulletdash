import React from "react";
import TodoTask from "./TodoTask";
import { Droppable } from "react-beautiful-dnd";
import { CSSTransitionGroup } from "react-transition-group";

class Todo extends React.Component {
  state = {
    value: ""
  };

  tasks = () => {
    return this.props.tasks.map(task => (
      <TodoTask deleteTask={this.deleteTask} key={task.id} task={task} />
    ));
  };

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleChange = event => {
    console.log(event);
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ value: "" });
    this.props.handleTaskSubmit(this.state.value);
  };

  deleteTask = task => {
    this.props.deleteTask(task);
  };

  render() {
    return (
      <div
        className="column column-40 column-offset-10"
        id="todo"
        style={
          this.props.theme === "colorful"
            ? { backgroundColor: "#016fb9" }
            : { backgroundColor: "#646566" }
        }
      >
        <h2>Todo</h2>
        <Droppable droppableId="tasks-container">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="tasks-container">
              <CSSTransitionGroup
                transitionName="task"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {this.tasks()}
              </CSSTransitionGroup>
              <div
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </div>
          )}
        </Droppable>
        <div className="task new-task">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Todo;
