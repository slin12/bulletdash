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
}

export default AuthAdapter;
