const url = "https://bullet-dash.herokuapp.com";

const getHeaders = () => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("jwt")
  };
};

class AuthAdapter {
  static login(params) {
    return fetch(`${url}/auth`, {
      method: "post",
      headers: getHeaders(),
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
      headers: getHeaders(),
      body: JSON.stringify({ tasks: tasks })
    });
  }

  static submitTask(value) {
    return fetch(`${url}/tasks`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify({ content: value })
    }).then(res => res.json());
  }

  static deleteTask(taskId) {
    return fetch(`${url}/tasks/${taskId}`, {
      method: "delete",
      headers: getHeaders()
    }).then(res => res.json());
  }

  static submitNote(value) {
    return fetch(`${url}/notes`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ content: value })
    });
  }

  static submitTracker(args) {
    return fetch(`${url}/trackers`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify(args)
    }).then(res => res.json());
  }

  static fetchTrackerData() {
    return fetch(`${url}/trackers`, {
      headers: getHeaders()
    }).then(res => res.json());
  }

  static changeTheme() {
    return fetch(`${url}/users/theme`, {
      headers: getHeaders()
    }).then(res => res.json());
  }
}

export default AuthAdapter;
