const url = "http://localhost:3000";
const headers = {
  "content-type": "application/json",
  accept: "application/json",
  Authorization: localStorage.getItem("jwt")
};

class AuthAdapter {
  static login(params) {
    return fetch(`${url}/auth`, {
      method: "post",
      headers: headers,
      body: JSON.stringify(params)
    }).then(res => res.json());
  }

  static userModules() {
    return fetch(`${url}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    }).then(res => res.json());
  }

  static updateTasks(tasks) {
    return fetch(`${url}/tasks`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ tasks: tasks })
    });
  }

  static submitTask(value) {
    return fetch(`${url}/tasks`, {
      method: "post",
      headers: headers,
      body: JSON.stringify({ content: value })
    }).then(res => res.json());
  }

  static deleteTask(taskId) {
    return fetch(`${url}/tasks/${taskId}`, {
      method: "delete",
      headers: headers
    }).then(res => res.json());
  }

  static submitNote(value) {
    return fetch(`${url}/notes`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ content: value })
    });
  }
}

export default AuthAdapter;
